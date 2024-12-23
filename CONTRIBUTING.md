# Contributing to Newsletter Discovery Frontend

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Development Setup](#development-setup)
3. [Development Workflow](#development-workflow)
4. [Commit Guidelines](#commit-guidelines)
5. [Pull Request Process](#pull-request-process)
6. [Performance Monitoring](#performance-monitoring)
7. [Troubleshooting](#troubleshooting)
8. [Additional Resources](#additional-resources)
9. [Questions?](#questions)

## Code of Conduct

- Be respectful and inclusive
- Collaborate constructively
- Prioritize the project's goals

## Development Setup

### Prerequisites

- Node.js (v16+ recommended)
- npm (v8+)
- PowerShell 7+

### Initial Setup

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file based on `.env.example`

## Development Workflow

### Running the Project

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run build:perf`: Build with performance monitoring

### Code Quality Tools

- ESLint: `npm run lint`
- Prettier: `npm run format`
- Run both: `npm run lint:fix`

## Commit Guidelines

### Conventional Commits

Use the following format:

```
<type>(optional scope): <description>

[optional body]

[optional footer(s)]
```

#### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code restructuring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

### Pre-Commit Checks

- Linting will run automatically
- Commit messages are validated
- Formatting is applied before commit

## Pull Request Process

1. Ensure code passes all linting and formatting checks
2. Update documentation if needed
3. Describe changes in PR description

## Performance Monitoring

- Use `npm run build:perf` to analyze build performance
- Keep bundle sizes under 5MB
- Build times should be under 1 minute

## Troubleshooting

- Clear npm cache: `npm cache clean --force`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)

## Questions?

Open an issue or contact the maintainers.
