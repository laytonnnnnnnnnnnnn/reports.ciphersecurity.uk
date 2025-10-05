# Discord Reporting Website

A comprehensive reporting system for Discord-related matters, security issues, data protection concerns, and safeguarding incidents. Built with Next.js, TypeScript, and Discord OAuth integration.

## Features

- **Public Reporting Form**: Easy-to-use form for submitting reports
- **Discord OAuth Authentication**: Secure authentication using Discord accounts
- **Automated Case Management**: Random case number and reference number generation
- **Intelligent Urgency Assignment**: Automatic urgency level assignment based on report content
- **Staff Dashboard**: Protected area for staff to review and manage reports
- **Discord Webhook Integration**: Real-time notifications to Discord channels
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Cloudflare Deployment Ready**: Optimized for Cloudflare Pages deployment

## Report Types

The system supports four main categories of reports:

1. **Discord Matters**: Issues related to Discord servers, users, or platform-specific problems
2. **Security Issues**: Security vulnerabilities, breaches, or suspicious activities
3. **Data Protection**: Privacy violations, data breaches, or GDPR compliance issues
4. **Safeguarding**: Concerns about safety, welfare, or protection of vulnerable users

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js with Discord OAuth
- **Database**: Prisma ORM with SQLite (development) / PostgreSQL (production)
- **Validation**: Zod for form and API validation
- **UI Components**: Lucide React icons, custom components
- **Deployment**: Cloudflare Pages compatible

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Discord application for OAuth
- Discord webhook URL for notifications

### 1. Clone and Install

```bash
git clone <repository-url>
cd discord-reporting-website
npm install
```

### 2. Environment Setup

Copy the environment template:

```bash
cp .env.example .env.local
```

Configure the following environment variables in `.env.local`:

```env
# Discord OAuth Configuration
DISCORD_CLIENT_ID=your_discord_client_id_here
DISCORD_CLIENT_SECRET=your_discord_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here

# Discord Webhook URL
DISCORD_WEBHOOK_URL=your_discord_webhook_url_here

# Database URL
DATABASE_URL="file:./dev.db"

# Staff Authentication
STAFF_USER_IDS=your_discord_user_id_here

# Application Settings
APP_NAME="Discord Reporting System"
ADMIN_EMAIL=admin@example.com
```

### 3. Database Setup

Generate Prisma client and create database:

```bash
npx prisma generate
npx prisma db push
```

### 4. Discord Application Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create a new application
3. In OAuth2 settings, add redirect URI: `http://localhost:3000/api/auth/callback/discord`
4. Copy Client ID and Client Secret to your environment variables
5. Create a webhook in your Discord server for notifications

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

### For Users

1. Visit the website
2. Click "Start Report" to begin
3. Sign in with Discord when prompted
4. Fill out the report form
5. Receive a case number for tracking

### For Staff

1. Ensure your Discord user ID is in the `STAFF_USER_IDS` environment variable
2. Visit `/staff` after signing in
3. View, filter, and manage reports
4. Update report status and add notes

## API Endpoints

- `GET /api/reports` - List reports (staff only)
- `POST /api/reports` - Submit new report
- `GET /api/reports/[id]` - Get specific report
- `PATCH /api/reports/[id]` - Update report (staff only)
- `GET /api/auth/*` - NextAuth endpoints

## Project Structure

```
src/
├── app/                   # Next.js app directory
│   ├── api/              # API routes
│   ├── report/           # Report submission page
│   ├── staff/            # Staff dashboard
│   └── layout.tsx        # Root layout
├── components/           # React components
├── lib/                  # Utility libraries
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Database client
│   ├── discord.ts       # Discord webhook functions
│   └── utils.ts         # Helper functions
└── types/               # TypeScript type definitions

prisma/
└── schema.prisma        # Database schema

docs/
└── CLOUDFLARE_DEPLOYMENT.md  # Deployment guide
```

## Deployment

See [Cloudflare Deployment Guide](docs/CLOUDFLARE_DEPLOYMENT.md) for detailed production deployment instructions.

### Quick Deploy to Cloudflare Pages

1. Push code to GitHub
2. Connect repository to Cloudflare Pages
3. Set environment variables in Cloudflare dashboard
4. Configure Discord OAuth redirect URI for production domain
5. Deploy!

## Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma database browser
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_CLIENT_ID` | Discord OAuth client ID | Yes |
| `DISCORD_CLIENT_SECRET` | Discord OAuth client secret | Yes |
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes |
| `DISCORD_WEBHOOK_URL` | Discord webhook for notifications | Yes |
| `DATABASE_URL` | Database connection string | Yes |
| `STAFF_USER_IDS` | Comma-separated Discord user IDs for staff | Yes |
| `APP_NAME` | Application display name | No |
| `ADMIN_EMAIL` | Administrator email | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Security Considerations

- All sensitive data is stored in environment variables
- Discord OAuth provides secure authentication
- Staff access is controlled via Discord user ID allowlist
- Report data is protected by authentication middleware
- Input validation on both client and server side

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:

1. Check the documentation
2. Review environment variable configuration
3. Test Discord OAuth setup
4. Verify database connectivity

## Acknowledgments

- Built with Next.js and the React ecosystem
- Icons provided by Lucide React
- Styling with Tailwind CSS
- Database management with Prisma ORM
