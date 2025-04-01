# Athlin Cricket Platform

A Next.js 14 application for managing cricket challenges, player profiles, and sponsorships.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Prisma
- NextAuth.js
- UploadThing
- Lucide React

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your environment variables
4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `/app` - Application routes and pages
- `/components` - Reusable UI components
- `/lib` - Utility functions and configurations
- `/styles` - Global styles and Tailwind configuration
- `/prisma` - Database schema and migrations

## Environment Variables

See `.env.example` for required environment variables.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

Proprietary - All rights reserved
