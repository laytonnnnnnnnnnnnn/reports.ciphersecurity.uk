# Cipher Security - Discord Issue Reporting Portal

A professional web application for reporting Discord-related issues with Discord OAuth authentication and webhook integration.

## Features

- **Discord OAuth Authentication** - Users must authenticate before submitting reports
- **Multiple Report Types**:
  - Staff Member Reports
  - General Reports (rule breaking, TOS violations)
  - Safeguarding Concerns (highest priority)
- **Contact Form** - General inquiries and support requests
- **Separate Webhooks** - Different Discord channels for each report type
- **Professional UI/UX** - Modern, responsive design with animations
- **User Accountability** - All reports include authenticated user information

## Setup Instructions

### 1. Discord Application Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. Go to "OAuth2" settings
4. Add redirect URI: `http://localhost:8000/auth/callback`
5. Note down your Client ID and Client Secret

### 2. Discord Webhooks Setup

Create separate webhooks for each report type:

1. Go to your Discord server settings
2. Navigate to Integrations > Webhooks
3. Create webhooks for:
   - Staff Reports Channel
   - General Reports Channel  
   - Safeguarding Reports Channel
   - Contact Form Channel

### 3. Environment Configuration

1. Copy `.env.example` to `.env`
2. Fill in your configuration:

```env
# Discord OAuth
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=http://localhost:8000/auth/callback

# Webhooks
WEBHOOK_STAFF_REPORTS=https://discord.com/api/webhooks/your_staff_webhook
WEBHOOK_GENERAL_REPORTS=https://discord.com/api/webhooks/your_general_webhook
WEBHOOK_SAFEGUARDING_REPORTS=https://discord.com/api/webhooks/your_safeguarding_webhook
WEBHOOK_CONTACT_FORM=https://discord.com/api/webhooks/your_contact_webhook

# App Settings
APP_URL=http://localhost:8000
SESSION_SECRET=your_random_session_secret
JWT_SECRET=your_jwt_secret
```

### 4. Client-Side Configuration

Since this is a client-side application, you'll need to configure the environment variables in the browser:

1. Open the browser console on your website
2. Run these commands to set your configuration:

```javascript
localStorage.setItem('ENV_DISCORD_CLIENT_ID', 'your_discord_client_id');
localStorage.setItem('ENV_WEBHOOK_STAFF_REPORTS', 'your_staff_webhook_url');
localStorage.setItem('ENV_WEBHOOK_GENERAL_REPORTS', 'your_general_webhook_url');
localStorage.setItem('ENV_WEBHOOK_SAFEGUARDING_REPORTS', 'your_safeguarding_webhook_url');
localStorage.setItem('ENV_WEBHOOK_CONTACT_FORM', 'your_contact_webhook_url');
```

### 5. Running the Application

```bash
# Start local web server
python -m http.server 8000

# Or use any other static file server
# The application will be available at http://localhost:8000
```

## File Structure

```
CipherReport2/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # Main application logic
├── auth.js             # Authentication and webhook management
├── .env.example        # Environment configuration example
├── .env                # Your actual environment configuration
└── README.md           # This file
```

## Security Considerations

⚠️ **Important**: This implementation includes client-side OAuth handling for demonstration purposes. In a production environment, you should:

1. **Server-Side OAuth**: Handle OAuth token exchange on your backend
2. **Secure Webhooks**: Store webhook URLs securely on your server
3. **Rate Limiting**: Implement rate limiting for form submissions
4. **Input Validation**: Add server-side validation for all inputs
5. **HTTPS**: Always use HTTPS in production
6. **Environment Variables**: Use proper environment variable management

## Report Types

### Staff Reports
- Report inappropriate behavior by server staff
- Includes severity levels and detailed incident tracking
- Confidential and anonymous options available

### General Reports  
- Rule breaking and TOS violations
- Spam, inappropriate content, trolling
- Community impact assessment

### Safeguarding Reports
- Child protection concerns
- Highest priority with immediate notifications
- Comprehensive incident documentation

### Contact Form
- General inquiries and support requests
- Technical issues and feedback
- Non-urgent communications

## Discord Integration

Each report type sends formatted embeds to different Discord channels with:

- **User Information**: Avatar, username, Discord ID
- **Report Details**: All form fields formatted appropriately  
- **Timestamps**: Automatic timestamp and report ID generation
- **Priority Indicators**: Special formatting for urgent reports
- **Mentions**: Automatic @here for safeguarding concerns

## Customization

### Adding New Report Types

1. Add configuration to `formConfigs` in `script.js`
2. Create new webhook URL in environment
3. Add routing in `WebhookManager.getWebhookForReportType()`
4. Update HTML with new report card

### Styling

The application uses CSS custom properties (variables) for easy theming:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* ... more variables */
}
```

## Browser Support

- Modern browsers with ES6+ support
- localStorage for authentication persistence  
- Fetch API for HTTP requests
- CSS Grid and Flexbox for layouts

## License

This project is provided as-is for educational and professional use.
