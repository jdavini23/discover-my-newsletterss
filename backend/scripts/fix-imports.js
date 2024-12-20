#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function fixImports() {
  const srcDir = path.resolve(__dirname, '../src');
  const fixes = [];

  // Read all TypeScript files
  const tsFiles = glob.sync(`${srcDir}/**/*.{ts,tsx}`);

  for (const file of tsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Fix malformed imports
    content = content.replace(
      /import\s*{\s*__import\s*{\s*([^}]+)\s*}\s*from\s*}\s*from/g,
      'import { $1 } from'
    );

    // Fix arrow function declarations
    content = content.replace(
      /export\s+const\s+(\w+)\s*=\s*(async\s+)?\([^)]*\)\s*:\s*void\s*=>/g,
      (match, name, async) => {
        if (async) {
          return `export const ${name} = async (_req: Request, _res: Response, next: NextFunction) =>`;
        }
        return `export const ${name} = (_req: Request, _res: Response, next: NextFunction) =>`;
      }
    );

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

    if (content !== fs.readFileSync(file, 'utf8')) {
      fs.writeFileSync(file, content);
      fixes.push(file);
      modified = true;
    }
  }

  console.log('\nFixes applied to:');
  fixes.forEach(file => console.log(` - ${path.relative(srcDir, file)}`));
}

fixImports().catch(console.error);
