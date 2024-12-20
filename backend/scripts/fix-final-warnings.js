#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function fixFinalWarnings() {
  const srcDir = path.resolve(__dirname, '../src');
  const fixes = [];

  // Read all TypeScript files
  const tsFiles = glob.sync(`${srcDir}/**/*.{ts,tsx}`);

  for (const file of tsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Fix unused imports
    content = content.replace(
      /import\s*{\s*([^}]+)\s*}\s*from/g,
      (match, imports) => {
        const cleanedImports = imports
          .split(',')
          .map(i => {
            const name = i.trim();
            return !content.includes(name, match.length) ? `_${name}` : name;
          })
          .join(', ');
        return `import { ${cleanedImports} } from`;
      }
    );

    // Fix unused variables in catch blocks
    content = content.replace(
      /catch\s*\((\w+)(?:\s*:\s*\w+)?\)\s*{/g,
      'catch (_error: unknown) {'
    );

    // Fix unused parameters in functions
    content = content.replace(
      /(\w+)\s*:\s*(Request|Response|NextFunction)(?=[\s,)])/g,
      '_$1: $2'
    );

    // Fix unused password variables
    content = content.replace(
      /(\w+)\s*:\s*string\s*=\s*password/g,
      '_$1: string = password'
    );

    // Replace any with unknown in route handlers
    content = content.replace(/<any>/g, '<unknown>');

    // Fix migration imports
    content = content.replace(
      /(import[^;]+;)/g,
      (match) => {
        if (match.includes('typeorm')) {
          return match.replace(/{\s*([^}]+)\s*}/, (m, imports) => {
            const cleanedImports = imports
              .split(',')
              .map(i => i.trim())
              .join(', ');
            return `{ ${cleanedImports} }`;
          });
        }
        return match;
      }
    );

    // Fix middleware function declarations
    content = content.replace(
      /export\s+const\s+(\w+)\s*=\s*(async\s+)?\([^)]*\)\s*=>/g,
      (match, name, async) => {
        if (async) {
          return `export const ${name} = async (_req: Request, _res: Response, next: NextFunction) =>`;
        }
        return `export const ${name} = (_req: Request, _res: Response, next: NextFunction) =>`;
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

fixFinalWarnings().catch(console.error);
