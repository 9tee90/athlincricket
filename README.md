# Athlin Cricket Platform

A platform where cricket legends (X-Pros) train the next generation through interactive video challenges.

## Features

- **Role-Based Access Control**
  - Players: Participate in challenges and receive feedback
  - X-Pros: Create challenges and provide expert feedback
  - Sponsors: Support emerging talent
  - Admins: Manage platform and users

- **Challenge System**
  - Video-based cricket challenges
  - Personalized feedback from X-Pros
  - Multiple challenge formats (Batting, Bowling, Fielding)

- **User Management**
  - Authentication with NextAuth.js
  - Role-specific dashboards
  - Profile management

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: tRPC, Prisma
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **File Upload**: UploadThing

## Getting Started

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd athlincricket
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in the required environment variables.

4. Set up the database:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Test Accounts

- **Admin Account**:
  - Email: admin@athlin.com
  - Password: password123

- **X-Pro Account**:
  - Email: xpro@athlin.com
  - Password: password123

- **Sponsor Account**:
  - Email: sponsor@athlin.com
  - Password: password123

- **Player Account**:
  - Email: player@athlin.com
  - Password: password123

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
