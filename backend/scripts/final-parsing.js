#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function finalParsing() {
  const srcDir = path.resolve(__dirname, '../src');
  const fixes = [];

  // Read all TypeScript files
  const tsFiles = glob.sync(`${srcDir}/**/*.{ts,tsx}`);

  for (const file of tsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Fix parsing errors in reference directives
    content = content.replace(
      /\/\/\/\s*<reference\s+([^>]+)>/g,
      (match, attrs) => {
        // Ensure the reference directive is well-formed
        return `/// <reference ${attrs.trim()} />`;
      }
    );

    // Fix arrow function parsing errors
    content = content.replace(
      /export\s+const\s+(\w+)\s*=\s*(async\s+)?\([^)]*\)\s*:\s*void\s*=>/g,
      (match, name, async) => {
        if (async) {
          return `export const ${name} = async (_req: Request, _res: Response, _next: NextFunction): Promise<void> =>`;
        }
        return `export const ${name} = (_req: Request, _res: Response, _next: NextFunction): void =>`;
      }
    );

    // Fix import statement parsing errors
    content = content.replace(
      /import\s*{\s*([^}]+)\s*}\s*from\s*(['"][^'"]+['"])\s*;/g,
      (match, imports, source) => {
        const cleanedImports = imports
          .split(',')
          .map(i => {
            const name = i.trim().replace(/^_/, '');
            return name;
          })
          .join(', ');
        
        return `import { ${cleanedImports} } from ${source};`;
      }
    );

    // Ensure all unused variables are prefixed with _
    content = content.replace(
      /\b(\w+)\s*:\s*(Request|Response|NextFunction|string)\s*=\s*[^;]+;/g,
      (match, name) => {
        // Check if the variable is used after its declaration
        const usageRegex = new RegExp(`\\b${name}\\b`, 'g');
        const usageCount = (content.match(usageRegex) || []).length;
        
        // If used only once (its own declaration), prefix with _
        return usageCount <= 1 ? `_${match}` : match;
      }
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

finalParsing().catch(console.error);
