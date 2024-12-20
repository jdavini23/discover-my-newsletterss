#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function fixSyntaxFinal() {
  const srcDir = path.resolve(__dirname, '../src');
  const fixes = [];

  // Read all TypeScript files
  const tsFiles = glob.sync(`${srcDir}/**/*.{ts,tsx}`);

  for (const file of tsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Fix async arrow function declarations
    content = content.replace(
      /async\s*\(\)\s*:\s*void\s*\((.*?)\)\s*=>/g,
      'async ($1) =>'
    );

    // Fix middleware function declarations
    content = content.replace(
      /export\s+const\s+(\w+)\s*=\s*async\s*\(\)\s*:\s*void\s*\((.*?)\)\s*=>/g,
      'export const $1 = async ($2) =>'
    );

    // Fix import statements
    content = content.replace(
      /import\s*{\s*([^}]+)\s*}\s*from\s*(['"][^'"]+['"])/g,
      (match, imports, source) => {
        const cleanedImports = imports
          .split(',')
          .map(i => i.trim().replace(/^_/, ''))
          .join(', ');
        return `import { ${cleanedImports} } from ${source}`;
      }
    );

    // Fix class method declarations
    content = content.replace(
      /(\w+)\s*\(\)\s*:\s*void\s*\((.*?)\)\s*{/g,
      '$1($2) {'
    );

    // Fix arrow function type annotations
    content = content.replace(
      /(\w+)\s*=\s*(async\s+)?\(\)\s*:\s*void\s*\((.*?)\)\s*=>/g,
      '$1 = $2($3) =>'
    );

    // Fix function parameters with type annotations
    content = content.replace(
      /function\s+(\w+)\s*\(\)\s*:\s*void\s*\((.*?)\)\s*{/g,
      'function $1($2) {'
    );

    // Fix unused variables in middleware
    content = content.replace(
      /(\w+)\s*:\s*(Request|Response|NextFunction)(?=[\s,)])/g,
      '_$1: $2'
    );

    if (content !== fs.readFileSync(file, 'utf8')) {
      fs.writeFileSync(file, content);
      fixes.push(file);
      modified = true;
    }
  }

  console.log('\nFixes applied to:');
  fixes.forEach(file => console.log(` - ${path.relative(srcDir, file)}`));
}

fixSyntaxFinal().catch(console.error);
