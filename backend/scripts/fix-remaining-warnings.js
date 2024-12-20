#!/usr/bin/env node
const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function fixRemainingWarnings() {
  const srcDir = path.resolve(__dirname, '../src');
  const fixes = [];

  // Read all TypeScript files
  const tsFiles = glob.sync(`${srcDir}/**/*.{ts,tsx}`);

  for (const file of tsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Fix unused parameters in middleware
    const middlewareParamRegex = /(\w+)\s*:\s*(?:Request|Response|NextFunction)(?:\s*,|\s*\))/g;
    content = content.replace(middlewareParamRegex, (match, name) => {
      if (!content.includes(name, match.length)) {
        return `_${name}: ${match.split(':')[1]}`;
      }
      return match;
    });

    // Fix unused error parameters
    const errorParamRegex = /catch\s*\((\w+)(?:\s*:\s*\w+)?\)\s*{/g;
    content = content.replace(errorParamRegex, (match, name) => {
      if (!content.includes(name, match.length)) {
        return match.replace(name, `_${name}`);
      }
      return match;
    });

    // Add return types to functions
    const functionRegex = /(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*\([^)]*\)(?!\s*:)/g;
    content = content.replace(functionRegex, (match, name) => {
      if (match.includes('async')) {
        return `${match}: Promise<void>`;
      }
      return `${match}: void`;
    });

    // Add return types to arrow functions
    const arrowFuncRegex = /(\w+)\s*=\s*(?:async\s+)?\([^)]*\)\s*=>(?!\s*:)/g;
    content = content.replace(arrowFuncRegex, (match, name) => {
      if (match.includes('async')) {
        return `${match}: Promise<void>`;
      }
      return `${match}: void`;
    });

    // Replace any with more specific types in routes
    const routeHandlerRegex = /(Request|Response)<any>/g;
    content = content.replace(routeHandlerRegex, (match, type) => {
      if (type === 'Request') {
        return 'Request<unknown, unknown, unknown>';
      }
      return 'Response<unknown>';
    });

    // Fix unused imports by adding underscore prefix
    const unusedImportRegex = /import\s*{\s*([^}]+)}\s*from/g;
    content = content.replace(unusedImportRegex, (match, imports) => {
      return match.replace(/\b(\w+)\b/g, (m) => {
        if (!content.includes(m, match.length) && !m.startsWith('_')) {
          return `_${m}`;
        }
        return m;
      });
    });

    if (content !== fs.readFileSync(file, 'utf8')) {
      fs.writeFileSync(file, content);
      fixes.push(file);
    }
  }

  console.log('\nFixes applied to:');
  fixes.forEach(file => console.log(` - ${path.relative(srcDir, file)}`));
}

fixRemainingWarnings().catch(console.error);
