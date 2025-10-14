const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));
app.use(session({
    secret: process.env.SESSION_SECRET || 'cipher-systems-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Discord OAuth and Bot configuration
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:3000/auth/callback';

// Configuration endpoint for frontend
app.get('/api/config', (req, res) => {
    res.json({
        DISCORD_CLIENT_ID: DISCORD_CLIENT_ID,
        REDIRECT_URI: REDIRECT_URI
    });
});

// Report ID generation function
function generateReportId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `RPT-${timestamp}-${random}`.toUpperCase();
}

// Discord DM function
async function sendDiscordDM(userId, message, embed = null) {
    if (!DISCORD_BOT_TOKEN) {
        console.warn('Discord bot token not configured - skipping DM');
        return false;
    }
    
    try {
        // Test bot token validity first
        const botInfoResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bot ${DISCORD_BOT_TOKEN}`
            }
        });
        
        // Create DM channel with user
        const dmResponse = await axios.post('https://discord.com/api/users/@me/channels', {
            recipient_id: userId
        }, {
            headers: {
                'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        const dmChannelId = dmResponse.data.id;
        
        // Send message to DM channel
        const messageData = {
            content: message
        };
        
        if (embed) {
            messageData.embeds = [embed];
        }
        
        const messageResponse = await axios.post(`https://discord.com/api/channels/${dmChannelId}/messages`, messageData, {
            headers: {
                'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        return true;
    } catch (error) {
        console.error('❌ Failed to send Discord DM:', {
            userId: userId,
            error: error.response?.data || error.message,
            status: error.response?.status,
            statusText: error.response?.statusText
        });
        return false;
    }
}

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Get environment configuration for frontend
app.get('/api/config', (req, res) => {
    res.json({
        clientId: DISCORD_CLIENT_ID,
        redirectUri: REDIRECT_URI
    });
});

// Check authentication status
app.get('/api/auth/status', (req, res) => {
    if (req.session.user) {
        res.json({
            authenticated: true,
            user: req.session.user
        });
    } else {
        res.json({
            authenticated: false
        });
    }
});

// Discord OAuth login
app.get('/auth/discord', (req, res) => {
    const params = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        redirect_uri: REDIRECT_URI,
        response_type: 'code',
        scope: 'identify'
    });
    
    res.redirect(`https://discord.com/oauth2/authorize?${params}`);
});

// Discord OAuth callback
app.get('/auth/callback', async (req, res) => {
    const { code } = req.query;
    
    if (!code) {
        return res.redirect('/?error=no_code');
    }
    
    try {
        // Exchange code for access token
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', 
            new URLSearchParams({
                client_id: DISCORD_CLIENT_ID,
                client_secret: DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        
        const { access_token } = tokenResponse.data;
        
        // Get user information
        const userResponse = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                'Authorization': `Bearer ${access_token}`
            }
        });
        
        const userData = userResponse.data;
        
        // Store user in session
        req.session.user = {
            id: userData.id,
            username: userData.username,
            discriminator: userData.discriminator,
            avatar: userData.avatar,
            displayName: `${userData.username}#${userData.discriminator}`
        };
        
        // Redirect to main page with success
        res.redirect('/?auth=success');
        
    } catch (error) {
        console.error('Discord OAuth error:', error.response?.data || error.message);
        res.redirect('/?error=auth_failed');
    }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to logout' });
        }
        res.json({ success: true });
    });
});

// Submit report (requires authentication)
app.post('/api/submit-report', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Authentication required' });
    }
    
    const { reportType, formData } = req.body;
    const user = req.session.user;
    
    // Get appropriate webhook URL
    let webhookUrl;
    switch (reportType) {
        case 'staff':
            webhookUrl = process.env.WEBHOOK_STAFF_REPORTS;
            break;
        case 'security':
            webhookUrl = process.env.WEBHOOK_GENERAL_REPORTS;
            break;
        case 'safeguarding':
            webhookUrl = process.env.WEBHOOK_SAFEGUARDING_REPORTS;
            break;
        default:
            return res.status(400).json({ error: 'Invalid report type' });
    }
    
    if (!webhookUrl) {
        return res.status(500).json({ error: 'Webhook URL not configured' });
    }
    
    try {
        // Generate unique report ID
        const reportId = generateReportId();
        
        // Create Discord embed
        const embed = {
            title: `📋 New ${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
            color: reportType === 'staff' ? 0xff4444 : 
                   reportType === 'safeguarding' ? 0xff8800 : 0x4444ff,
            fields: [
                {
                    name: '🆔 Report ID',
                    value: `\`${reportId}\``,
                    inline: true
                },
                {
                    name: '👤 Reported by',
                    value: `${user.displayName} (ID: ${user.id})`,
                    inline: true
                }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Cipher Security Report'
            }
        };
        
        // Add form fields to embed (exclude reportId to avoid duplicates)
        Object.entries(formData).forEach(([key, value]) => {
            if (value && value.trim() && key.toLowerCase() !== 'reportid' && key.toLowerCase() !== 'report_id') {
                embed.fields.push({
                    name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
                    value: value.length > 1000 ? value.substring(0, 1000) + '...' : value,
                    inline: false
                });
            }
        });
        
        // Send to Discord webhook
        await axios.post(webhookUrl, {
            embeds: [embed]
        });
        
        // Send DM confirmation to user
        const confirmationEmbed = {
            title: '✅ Report Submitted Successfully',
            description: `Your ${reportType} report has been received and is being reviewed by our team.`,
            color: 0x00ff00,
            fields: [
                {
                    name: '🆔 Your Report ID',
                    value: `\`${reportId}\``,
                    inline: false
                },
                {
                    name: '📅 Submitted',
                    value: new Date().toLocaleString('en-US', { 
                        timeZone: 'UTC',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    }) + ' UTC',
                    inline: false
                },
                {
                    name: 'ℹ️ What happens next?',
                    value: 'Our team will review your report and take appropriate action. Please keep your Report ID for reference if you need to follow up.',
                    inline: false
                }
            ],
            footer: {
                text: 'Cipher Security - Report Confirmation'
            },
            timestamp: new Date().toISOString()
        };
        
        // Send DM to user (non-blocking)
        sendDiscordDM(
            user.id, 
            `Thank you for submitting a report to Cipher Security! 📋`,
            confirmationEmbed
        ).catch(error => {
            console.warn('Failed to send confirmation DM:', error.message);
        });
        
        res.json({ 
            success: true, 
            message: 'Report submitted successfully',
            reportId: reportId 
        });
        
    } catch (error) {
        console.error('Webhook error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to submit report' });
    }
});

// Submit contact form
app.post('/api/submit-contact', async (req, res) => {
    const { formData } = req.body;
    const webhookUrl = process.env.WEBHOOK_CONTACT; // Add this to your .env
    
    if (!webhookUrl) {
        return res.status(500).json({ error: 'Contact webhook URL not configured' });
    }
    
    try {
        const embed = {
            title: '📧 New Contact Form Submission',
            color: 0x00ff00,
            fields: [],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'Cipher Security Contact'
            }
        };
        
        // Add form fields to embed
        Object.entries(formData).forEach(([key, value]) => {
            if (value && value.trim()) {
                embed.fields.push({
                    name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
                    value: value.length > 1000 ? value.substring(0, 1000) + '...' : value,
                    inline: false
                });
            }
        });
        
        await axios.post(webhookUrl, {
            embeds: [embed]
        });
        
        res.json({ success: true, message: 'Contact form submitted successfully' });
        
    } catch (error) {
        console.error('Contact webhook error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to submit contact form' });
    }
});



// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    // Server started silently
});
