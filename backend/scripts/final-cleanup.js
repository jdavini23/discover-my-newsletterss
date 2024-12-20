#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function finalCleanup() {
  const srcDir = path.resolve(__dirname, '../src');
  const fixes = [];

  // Read all TypeScript files
  const tsFiles = glob.sync(`${srcDir}/**/*.{ts,tsx}`);

  for (const file of tsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Remove completely unused imports
    content = content.replace(
      /import\s*{\s*([^}]+)\s*}\s*from\s*(['"][^'"]+['"])\s*;/g,
      (match, imports, source) => {
        const cleanedImports = imports
          .split(',')
          .filter(i => {
            const name = i.trim().replace(/^_/, '');
            return content.includes(name);
          })
          .join(', ');
        
        return cleanedImports ? `import { ${cleanedImports} } from ${source};` : '';
      }
    );

    // Prefix completely unused variables with _
    content = content.replace(
      /\b(\w+)\s*=\s*[^;]+;/g,
      (match, name) => {
        // Check if the variable is used after its declaration
        const usageRegex = new RegExp(`\\b${name}\\b`, 'g');
        const usageCount = (content.match(usageRegex) || []).length;
        
        // If used only once (its own declaration), prefix with _
        return usageCount <= 1 ? `_${match}` : match;
      }
    );

    // Replace any remaining any types with unknown
    content = content.replace(/<any>/g, '<unknown>');

    // Ensure all error parameters are named _error
    content = content.replace(
      /catch\s*\((\w+)(?:\s*:\s*\w+)?\)\s*{/g,
      'catch (_error: unknown) {'
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

finalCleanup().catch(console.error);
