#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function fixSyntaxErrors() {
  const srcDir = path.resolve(__dirname, '../src');
  const fixes = [];

  // Read all TypeScript files
  const tsFiles = glob.sync(`${srcDir}/**/*.{ts,tsx}`);

  for (const file of tsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Fix incorrect import statements with underscores
    content = content.replace(/(_)?import\s*{([^}]+)}\s*(_)?from/g, (_, p1, imports) => {
      return `import { ${imports.replace(/(_)?(\w+)/g, '$2')} } from`;
    });

    // Fix incorrect arrow function return types
    content = content.replace(/(\w+)\s*=\s*(async\s+)?\([^)]*\)\s*=>\s*:\s*/g, '$1 = $2() => ');

    // Fix incorrect function return types
    content = content.replace(/function\s+(\w+)\s*\([^)]*\)\s*:\s*:\s*/g, 'function $1(): ');

    // Remove extra semicolons
    content = content.replace(/;;+/g, ';');

    // Fix incorrect type annotations
    content = content.replace(/(\w+)\s*:\s*:\s*/g, '$1: ');

    // Fix arrow function type annotations
    content = content.replace(/(\w+)\s*=\s*(async\s+)?\([^)]*\)\s*=>\s*{/g, '$1 = $2(): void => {');

    // Fix middleware function type annotations
    content = content.replace(/(app\.use\([^)]*\))\s*:\s*void/g, '$1');

    // Fix request handler type annotations
    content = content.replace(/(req|res|next)(\s*:\s*[^,)]+)(?:\s*:\s*void)?/g, '$1$2');

    if (content !== fs.readFileSync(file, 'utf8')) {
      fs.writeFileSync(file, content);
      fixes.push(file);
    }
  }

  console.log('\nFixes applied to:');
  fixes.forEach(file => console.log(` - ${path.relative(srcDir, file)}`));
}

fixSyntaxErrors().catch(console.error);
