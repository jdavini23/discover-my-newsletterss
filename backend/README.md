# Newsletter Discovery Platform - Backend

## Prerequisites
- Node.js (v18+)
- PostgreSQL (v13+)

## Setup

1. Clone the repository
2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following contents:
```
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/newsletter_discovery
NODE_ENV=development
JWT_SECRET=your_jwt_secret_here
```

4. Start the development server
```bash
npm run dev
```

## Database Migrations

- Generate migrations: `npm run migration:generate`
- Run migrations: `npm run migration:run`
- Revert migrations: `npm run migration:revert`

## Environment Variables
- `PORT`: Server port
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Application environment (development/production)
- `JWT_SECRET`: Secret for JWT token generation

## Project Structure
- `src/models/`: TypeORM entity definitions
- `src/config/`: Configuration files
- `src/migrations/`: Database migration scripts
