@echo off

REM Install TypeScript and ts-node if not already installed
npm install -g typescript ts-node

REM Run the TypeScript fixer script
npx ts-node fix-typescript-issues.ts

REM Run type checking
npm run tsc

REM Run build to verify
npm run build
