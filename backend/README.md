# Newsletter Discovery Platform - Backend

## Prerequisites
- Node.js (v16+)
- MySQL (v8.0+)
- Redis

## Setup

1. Clone the repository
2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following contents:
```
PORT=5000
DATABASE_URL=mysql://username:password@localhost:3306/newsletter_discovery
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
- `DATABASE_URL`: MySQL connection string
- `NODE_ENV`: Application environment (development/production)
- `JWT_SECRET`: Secret for JWT token generation

## Testing

### Running Tests

Before running tests, ensure you have Docker installed and running.

1. Start the test database:
```bash
docker-compose up -d test-db
```

2. Run unit tests:
```bash
npm run test:unit
```

3. Run integration tests:
```bash
npm run test:integration
```

4. Run all tests with coverage:
```bash
npm run test:coverage
```

### Test Database

The test suite uses a separate MySQL database (`newsletter_test`) running in a Docker container. 
This ensures that tests do not interfere with your development or production databases.

- Database Host: `localhost`
- Database Port: `3307`
- Database Name: `newsletter_test`
- Username: `root`
- Password: `root`

### Cleanup

To stop the test database:
```bash
docker-compose down
```

## Project Structure
- `src/models/`: TypeORM entity definitions
- `src/config/`: Configuration files
- `src/migrations/`: Database migration scripts
