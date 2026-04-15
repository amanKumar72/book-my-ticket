# Book My Ticket

A simple movie ticket booking system built with Node.js, TypeScript, and PostgreSQL.

## Quick Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL database

### Installation
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup database**
   ```bash
   # Create .env file with your database URL
   DATABASE_URL=postgresql://username:password@localhost:5432/book_my_ticket
   JWT_SECRET=your_secret_key

   # OR Create a prisma db
   npx create-db

   # To see the database of prisma db
   npx prisma studio

   # Run migrations
   npx prisma migrate dev

   # Generate 
   npx prisma generate
   ```

3. **Create default movie**
  Uncomment the app.ts fucntion init

4. **Start the app**
   ```bash
   npm run dev
   ```

   Server runs at `http://localhost:8080`


## API Flow

### 1. User Registration & Login
```
POST /auth/register → Create account
POST /auth/login → Get JWT token
```

### 2. Browse Movies
```
GET /movie → List all movies
GET /movie/:id → Get movie details
```

### 3. Book Tickets
```
GET /ticket/:movieId → Check available seats
PUT /ticket/book/:ticketId → Book a seat
```

### 4. View Bookings
```
GET /auth/me → Get user profile
Navigate to /my-bookings → View your tickets
```

## Tech Stack
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: JWT tokens + bcrypt
- **Frontend**: HTML + Tailwind CSS
