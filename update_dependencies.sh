#!/bin/bash

# Dependency Update Script

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to log messages
log() {
    echo -e "${GREEN}[DEPENDENCY UPDATE]${NC} $1"
}

# Function to handle errors
error() {
    echo -e "${YELLOW}[ERROR]${NC} $1"
    exit 1
}

# Ensure script is run from project root
if [ ! -f "package.json" ]; then
    error "Please run this script from the project root directory"
fi

# Update npm packages
log "Updating npm packages..."
npm update || error "Failed to update npm packages"

# Check for outdated packages
log "Checking for outdated packages..."
npm outdated

# Run security audit
log "Running security audit..."
npm audit || log "Some vulnerabilities found. Review and address them."

# Rebuild project
log "Rebuilding project..."
npm run build || error "Build failed after dependency update"

# Run tests to ensure updates didn't break anything
log "Running tests..."
npm test || error "Tests failed after dependency update"

log "Dependency update completed successfully!"

# Optional: Commit updates
read -p "Do you want to commit these dependency updates? (y/n) " commit
if [[ $commit == "y" ]]; then
    git add package.json package-lock.json
    git commit -m "chore: Update project dependencies"
fi
