This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Email Configuration

This application sends email notifications for onboarding and verification. To enable email functionality, you need to configure SMTP settings.

### Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# SMTP Server Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# SMTP Authentication
SMTP_USER=sakshamsharmaofficial7@gmail.com
SMTP_PASS=cual idip ttmm wagm

# Admin Email Address
ADMIN_EMAIL=sakshamsharmaofficial7@gmail.com

# Optional: Admin Dashboard URL (for email links)
# ADMIN_DASHBOARD_URL=https://your-domain.com/admin
```

### Gmail Setup

If using Gmail SMTP:

1. Enable 2-Step Verification on your Google Account
2. Go to Google Account Settings > Security > 2-Step Verification > App passwords
3. Generate a new app password for "Mail"
4. Use this app password (not your regular password) as `SMTP_PASS`

### Email Notifications

The application sends emails in the following scenarios:

1. **Onboarding Completion**: When a doctor or nurse completes onboarding
   - Email to applicant: "Onboarding Successful - Verification Pending"
   - Email to admin: "New [Doctor/Nurse] Application Received"

2. **Account Verification**: When admin marks an applicant as verified
   - Email to applicant: "Account Verified - You're Now Live!"

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
