// Static Discord Webhook System (No Authentication Required)

class SimpleAuth {
    constructor() {
        this.authenticated = true; // Always authenticated for static mode
        this.userInfo = {
            id: 'static_user',
            username: 'Anonymous',
            displayName: 'Anonymous User',
            avatar: null
        };
        this.updateUI();
    }

    updateUI() {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userInfo = document.getElementById('userInfo');

        // Hide auth buttons in static mode
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'none';
    }

    // Compatibility methods for script.js
    isAuthenticated() {
        return true; // Always return true for static mode
    }

    isLoggedIn() {
        return true;
    }

    getUser() {
        return this.userInfo;
    }

    getCurrentUser() {
        return this.userInfo;
    }

    login() {
        // No-op for static mode
    }

    logout() {
        // No-op for static mode
    }
}

class WebhookManager {
    constructor() {
        this.webhooks = {
            reports: 'https://discord.com/api/webhooks/1321039711653888100/1WCrj9HbqSN89tw8dR00qQVJKPt9thlnvL1zSDT8FWUv8CJOJxWpUPFO8paCCD9SDGUN',
            contact: 'https://discord.com/api/webhooks/1321040059004354673/ShXafzxIgVH3M8vpE2pT0m0TaKXAKVJiW3x0RZBlNArOLDoT6DMVokEpA6jBEmxy8RlK',
            support: 'https://discord.com/api/webhooks/1321040110368993362/YfAGtOLJLBORAJBgcWwFhahK3LRKotXmZUmrD7eVNojMHHaRiVp_B7Je67wdKC1SK3Ij'
        };
    }

    async sendReport(reportType, formData, authenticatedUser) {
        try {
            const reportId = this.generateReportId();
            
            let typeIcon = '🚨';
            let typeColor = 0xff4444;
            
            switch(reportType) {
                case 'scam':
                    typeIcon = '⚠️';
                    typeColor = 0xff9500;
                    break;
                case 'hack':
                    typeIcon = '🔒';
                    typeColor = 0xff0000;
                    break;
                case 'abuse':
                    typeIcon = '🛡️';
                    typeColor = 0x8b5cf6;
                    break;
                case 'spam':
                    typeIcon = '📧';
                    typeColor = 0xfbbf24;
                    break;
                case 'other':
                    typeIcon = '❓';
                    typeColor = 0x64748b;
                    break;
                case 'staff':
                    typeIcon = '👥';
                    typeColor = 0xff6600;
                    break;
                case 'general':
                    typeIcon = '📋';
                    typeColor = 0x0099ff;
                    break;
                case 'safeguarding':
                    typeIcon = '🛡️';
                    typeColor = 0xff0000;
                    break;
            }

            const embed = {
                title: typeIcon + ' New ' + reportType.toUpperCase() + ' Report',
                color: typeColor,
                fields: [
                    {
                        name: '🆔 Report ID',
                        value: `\`${reportId}\``,
                        inline: true
                    },
                    {
                        name: '👤 Submitted by',
                        value: 'Anonymous User',
                        inline: true
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Cipher Security Report System'
                }
            };

            // Add form fields
            Object.entries(formData).forEach(([key, value]) => {
                if (value && value.trim()) {
                    embed.fields.push({
                        name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
                        value: value.length > 1000 ? value.substring(0, 1000) + '...' : value,
                        inline: false
                    });
                }
            });

            // Send to Discord webhook
            const response = await fetch(this.webhooks.reports, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [embed],
                    username: 'Cipher Security Reports'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send webhook');
            }

            return { 
                success: true, 
                message: `Report submitted successfully! Report ID: ${reportId}`,
                reportId: reportId 
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async sendContactForm(formData) {
        try {
            const embed = {
                title: '📬 New Contact Form Submission',
                color: 0x3b82f6,
                fields: [
                    {
                        name: '👤 Name',
                        value: formData.name || 'Not provided',
                        inline: true
                    },
                    {
                        name: '📧 Email',
                        value: formData.email || 'Not provided',
                        inline: true
                    },
                    {
                        name: '📋 Subject',
                        value: formData.subject || 'No subject',
                        inline: false
                    },
                    {
                        name: '💬 Message',
                        value: '```' + (formData.message || 'No message') + '```',
                        inline: false
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Cipher Security Contact System'
                }
            };

            const response = await fetch(this.webhooks.contact, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [embed],
                    username: 'Cipher Security Contact'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send contact form');
            }

            return { 
                success: true, 
                message: 'Contact form submitted successfully!' 
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async sendSupportForm(formData) {
        try {
            const embed = {
                title: '🎧 New Support Request',
                color: 0x10b981,
                fields: [
                    {
                        name: '👤 Name',
                        value: formData.name || 'Not provided',
                        inline: true
                    },
                    {
                        name: '📧 Email',
                        value: formData.email || 'Not provided',
                        inline: true
                    },
                    {
                        name: '⚠️ Priority',
                        value: formData.priority || 'Normal',
                        inline: true
                    },
                    {
                        name: '📋 Issue Type',
                        value: formData.issueType || 'General',
                        inline: true
                    },
                    {
                        name: '💬 Description',
                        value: '```' + (formData.description || 'No description') + '```',
                        inline: false
                    }
                ],
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Cipher Security Support System'
                }
            };

            const response = await fetch(this.webhooks.support, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    embeds: [embed],
                    username: 'Cipher Security Support'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send support request');
            }

            return { 
                success: true, 
                message: 'Support request submitted successfully!' 
            };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    generateReportId() {
        const timestamp = Date.now().toString().slice(-8);
        const random = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
        return `RPT-${timestamp}-${random}`;
    }
}

// Global instances
var discordAuth;
var webhookManager;

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    discordAuth = new SimpleAuth();
    webhookManager = new WebhookManager();
    
    // No need for login/logout handlers in static mode
});
