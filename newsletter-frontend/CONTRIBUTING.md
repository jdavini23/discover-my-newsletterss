# Contributing to Newsletter Discovery Frontend

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Message Guidelines](#commit-message-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Reporting Bugs](#reporting-bugs)

## Code of Conduct
- Be respectful and inclusive
- Collaborate constructively
- Prioritize the project's goals

## Getting Started
### Prerequisites
- Node.js (v18+)
- npm (v9+)
- Git

### Setup
1. Fork the repository
2. Clone your fork
```bash
git clone https://github.com/your-username/discover-my-newsletters.git
cd newsletter-frontend
npm install
```

## Development Workflow
1. Create a new branch for your feature/fix
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes
3. Run linting and formatting
```bash
npm run lint
npm run format
```

4. Commit your changes following our [Commit Message Guidelines](#commit-message-guidelines)

## Coding Standards
### TypeScript
- Use TypeScript strict mode
- Avoid `any` types
- Use meaningful variable and function names
- Add type annotations
- Use interfaces and type aliases

### React
- Use functional components
- Prefer hooks over class components
- Keep components small and focused
- Use prop types or TypeScript interfaces

### Styling
- Use Tailwind CSS utility classes
- Keep styles consistent
- Avoid inline styles when possible

## Commit Message Guidelines
Use the following format:
```
<type>: <subject>

[optional body]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons
- `refactor`: Code restructure without changing behavior
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

### Example
```
feat: Add user authentication flow

- Implement login and registration components
- Add error handling for authentication requests
```

## Pull Request Process
1. Ensure all tests pass
2. Update documentation if needed
3. Get at least one code review approval
4. Squash and merge

## Reporting Bugs
1. Check existing issues
2. Use the bug report template
3. Provide:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Environment details

## Additional Resources
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)

## Questions?
Open an issue or contact the maintainers.
