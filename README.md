# AthlinCricket

A platform for creating and participating in cricket challenges.

## Features

- User authentication with NextAuth.js
- Challenge creation wizard for XPro users
- Video upload support with UploadThing
- Responsive design with TailwindCSS
- Type-safe with TypeScript
- Database with Prisma and PostgreSQL

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/9tee90/athlincricket.git
cd athlincricket
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with the following variables:
```env
DATABASE_URL="your-database-url"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
