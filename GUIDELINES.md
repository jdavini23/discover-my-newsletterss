# Project Development Guidelines

## 1. Development Environment Setup

### Prerequisites
- Node.js v20+
- npm v10+
- Git v2.40+
- Docker and Docker Compose
- Visual Studio Code (recommended)

### Initial Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/discover-my-newsletters.git

# Install dependencies
cd discover-my-newsletters
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your specific configurations

# Install Git hooks
npm run prepare
```

## 2. Development Workflow

### Starting the Development Environment
```bash
# Start all services (frontend, backend, DB, Redis)
docker-compose up

# Start specific services
docker-compose up frontend backend
```

### Running Tests
```bash
# Run all tests
npm test

# Run backend tests only
npm run test:backend

# Run frontend tests only
npm run test:frontend
```

### Code Quality Tools
```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Clean build artifacts
npm run clean
```

### NPM Maintenance
```bash
# Diagnose npm issues
npm run diagnose

# Fix npm issues
npm run fix
```

## 3. Git Workflow

### Commit Message Format
We use conventional commits format:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `perf:` Performance improvements
- `test:` Adding or modifying tests
- `build:` Build system changes
- `ci:` CI configuration changes
- `chore:` Maintenance tasks

### Pre-commit Hooks
The following checks run automatically before commits:
- Linting
- Code formatting
- Type checking
- Unit tests
- Commit message validation

## 4. Docker Environment

### Available Services
- Frontend (React): Port 3000
- Backend (Node.js): Port 4000
- MySQL Database: Port 3306
- Redis: Port 6379
- Test Database: Port 3307

### Docker Commands
```bash
# Start development environment
docker-compose up

# Start in production mode
NODE_ENV=production docker-compose up

# Rebuild containers
docker-compose build

# Clean up containers and volumes
docker-compose down -v
```

## 5. Code Quality Standards

### TypeScript
- Strict mode enabled
- No `any` types unless absolutely necessary
- Explicit return types on functions
- Comprehensive error handling
- Proper type definitions

### React Best Practices
- Functional components with hooks
- Proper prop typing
- Memoization for expensive computations
- Error boundaries implementation
- Accessibility standards

### Testing Requirements
- Unit tests for business logic
- Integration tests for API endpoints
- Component tests for React components
- Minimum 80% test coverage
- E2E tests for critical paths

## 6. Security Best Practices

### Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Secure password hashing
- Two-factor authentication support
- Session management

### API Security
- Rate limiting
- CORS configuration
- Input validation
- XSS protection
- CSRF protection
- Security headers

### Data Protection
- Encrypted environment variables
- Secure database connections
- PII data handling
- Data backup procedures
- Audit logging

## 7. Performance Guidelines

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle size monitoring
- Performance monitoring

### Backend
- Query optimization
- Caching strategy
- Connection pooling
- Memory management
- Response compression

## 8. Monitoring and Logging

### Logging Standards
- Structured logging format
- Error context preservation
- PII data protection
- Log rotation
- Performance metrics

### Monitoring Tools
- Application metrics
- Error tracking
- Performance monitoring
- User analytics
- Server metrics

## 9. Deployment

### Production Deployment
```bash
# Build production images
NODE_ENV=production docker-compose build

# Deploy production stack
NODE_ENV=production docker-compose up -d
```

### Environment Variables
- Use `.env` for local development
- Use secure secrets management in production
- Regular credential rotation
- Environment-specific configurations

## 10. Troubleshooting

### Common Issues
- Check logs: `docker-compose logs -f [service]`
- Verify environment variables
- Check service health: `docker-compose ps`
- Review container resources

### Development Tools
- Node.js debugger configuration
- React DevTools setup
- Redux DevTools (if applicable)
- Network debugging tools

## 11. Documentation

### Requirements
- README.md with setup instructions
- API documentation (OpenAPI/Swagger)
- Component documentation
- Architecture diagrams
- Changelog maintenance

### Style Guide
- Clear and concise writing
- Code examples where appropriate
- Regular updates
- Version history
- Troubleshooting guides
