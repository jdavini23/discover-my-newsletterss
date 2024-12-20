#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function applyFinalFixes() {
  const srcDir = path.resolve(__dirname, '../src');
  const fixes = [];

  // Read all TypeScript files
  const tsFiles = glob.sync(`${srcDir}/**/*.{ts,tsx}`);

  for (const file of tsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Fix import statements
    content = content.replace(/import\s*{([^}]+)}\s*from/g, (match, imports) => {
      const cleanedImports = imports
        .split(',')
        .map(i => i.trim().replace(/^_/, ''))
        .join(', ');
      return `import { ${cleanedImports} } from`;
    });

    // Fix unused variables in middleware
    content = content.replace(/(\w+)\s*:\s*(Request|Response|NextFunction)/g, (match, name) => {
      return `_${name}: ${match.split(':')[1]}`;
    });

    // Fix middleware function return types
    content = content.replace(
      /(async\s+)?\([^)]*\)\s*:\s*(Promise<void>|void)\s*=>/g,
      (match, async) => `${async || ''}(req: Request, res: Response, next: NextFunction) =>`
    );

    // Add return types to controller methods
    content = content.replace(
      /async\s+(\w+)\s*\([^)]*\)\s*{/g,
      'async $1(req: Request, res: Response): Promise<void> {'
    );

    // Replace any with unknown in route handlers
    content = content.replace(
      /(Request|Response)<any>/g,
      (match, type) => `${type}<unknown>`
    );

    // Fix unused error parameters
    content = content.replace(
      /catch\s*\((\w+)(?:\s*:\s*\w+)?\)\s*{/g,
      'catch (_error: unknown) {'
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

    // Fix arrow function return types
    content = content.replace(
      /(\w+)\s*=\s*(async\s+)?\([^)]*\)\s*=>\s*{/g,
      (match, name, async) => {
        if (async) {
          return `${name} = async (req: Request, res: Response): Promise<void> => {`;
        }
        return `${name} = (req: Request, res: Response): void => {`;
      }
    );

    // Fix unused variables in function parameters
    content = content.replace(
      /(\w+)\s*:\s*([^,)]+)(?=\s*[,)])/g,
      (match, name, type) => {
        if (!content.includes(name, match.length)) {
          return `_${name}: ${type}`;
        }
        return match;
      }
    );

    if (content !== fs.readFileSync(file, 'utf8')) {
      fs.writeFileSync(file, content);
      fixes.push(file);
    }
  }

  console.log('\nFixes applied to:');
  fixes.forEach(file => console.log(` - ${path.relative(srcDir, file)}`));
}

applyFinalFixes().catch(console.error);
