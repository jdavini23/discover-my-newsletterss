#!/bin/bash

# Install TypeScript and ts-node if not already installed
npm install -g typescript ts-node

# Run the TypeScript fixer script
npx ts-node fix-typescript-issues.ts

# Run type checking
npm run tsc

# Run build to verify
npm run build
