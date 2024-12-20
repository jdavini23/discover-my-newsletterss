# Newsletter Discovery Platform - Backend

## Prerequisites
- Node.js (v16+)
- MySQL (v8.0+)
- Redis

## Development Setup

### Prerequisites
- Node.js
- Git
- PowerShell (Windows) or Bash (Mac/Linux)

### Getting Started
- Run `npm install` to install dependencies
- Use `npm run dev` to start the development server
- Use `npm run commit` to commit changes (works on Windows and Unix-like systems)

### Platform-Specific Notes
- Windows users: Ensure PowerShell execution policy allows script running
- Mac/Linux users: Ensure bash scripts have execute permissions

### Available Scripts
- `npm start`: Run production server
- `npm run dev`: Start development server
- `npm run build`: Compile TypeScript
- `npm run commit`: Cross-platform git commit
- `npm test`: Run tests

## Database Migrations

- Generate migrations: `npm run migration:generate`
- Run migrations: `npm run migration:run`
- Revert migrations: `npm run migration:revert`

## Environment Variables
- `PORT`: Server port
- `DATABASE_URL`: MySQL connection string
- `NODE_ENV`: Application environment (development/production)
- `JWT_SECRET`: Secret for JWT token generation

## Code Quality, Testing, and Security

### Code Quality
- Run `npm run lint` to check code quality
- Run `npm run lint:fix` to automatically fix linting issues
- Run `npm run format` to format code

### Testing
- Run `npm test` to execute all tests
- Run `npm run test:watch` for watch mode
- Run `npm run test:coverage` to generate coverage report
- Aim for 80%+ test coverage

### Security Practices
- Never commit sensitive information
- Use environment variables for configuration
- Implement input validation
- Use rate limiting
- Set secure HTTP headers
- Validate and sanitize user inputs

### Development Workflow
1. Write code
2. Run linter: `npm run lint`
3. Format code: `npm run format`
4. Run tests: `npm test`
5. Commit changes

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

## Deployment
TBD

## Project Structure
- `src/models/`: TypeORM entity definitions
- `src/config/`: Configuration files
- `src/migrations/`: Database migration scripts
