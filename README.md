# AthlinCricket

A Next.js application for cricket challenges and feedback.

## Environment Variables

The following environment variables are required for the application to function:

```env
# Database
DATABASE_URL="your-database-url"

# NextAuth.js
NEXTAUTH_URL="https://athlincricket.vercel.app"
NEXTAUTH_SECRET="your-nextauth-secret"

# UploadThing
UPLOADTHING_SECRET="your-uploadthing-secret"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
```

## Deployment

The application is deployed on Vercel. The following configuration is used:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables from above to a `.env` file
4. Run the development server:
   ```bash
   npm run dev
   ```

## Features

- User authentication with NextAuth.js
- Video uploads with UploadThing
- Challenge creation and management
- Pose feedback system
- Winner selection for challenges

## Tech Stack

- Next.js 14
- TypeScript
- Prisma with PostgreSQL
- NextAuth.js
- UploadThing
- Tailwind CSS
- tRPC

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── challenges/
│   │   └── uploadthing/
│   ├── auth/
│   ├── challenges/
│   └── dashboard/
├── components/
│   └── ui/
├── lib/
└── types/
```

## Authentication

The application uses NextAuth.js for authentication. Users can sign in with their email and password. The following roles are supported:

- `player`: Regular users who can participate in challenges
- `xpro`: Users who can create challenges
- `sponsor`: Users who can sponsor challenges
- `admin`: Administrative users

## Challenge Creation

XPro users can create challenges through a 4-step wizard:

1. Challenge Basics (category and title)
2. Media & Instructions (video upload and description)
3. Deadline & Reward (deadline date and optional reward)
4. Review & Submit (preview and publish)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
