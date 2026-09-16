# Hudson Fire Department Admin

This repository includes a secure admin section built with Next.js, Prisma, PostgreSQL, and NextAuth.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a PostgreSQL database.
3. Copy `.env.example` to `.env` and update the values.
4. Run the Prisma migration:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the app:
   ```bash
   npm run dev
   ```
6. Login at http://localhost:3000/admin/login

## Default admin credentials

- Email: admin@hudsonfire.org
- Password: ChangeMe123!

Change these immediately in production.

## Features

- Admin-only login
- Protected `/admin` routes
- Fundraiser management
- Staff management
- PostgreSQL data storage
