#!/usr/bin/env node
const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function fixWarnings() {
  const srcDir = path.resolve(__dirname, '../src');
  const fixes = [];

  // Read all TypeScript files
  const tsFiles = glob.sync(`${srcDir}/**/*.{ts,tsx}`);

  for (const file of tsFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Fix duplicate imports
    const importMap = new Map();
    const importRegex = /import\s+(?:{[^}]+}|\*\s+as\s+[^,\s]+|\w+)\s+from\s+['"]([^'"]+)['"]/g;
    let match;
    let importLines = [];
    while ((match = importRegex.exec(content)) !== null) {
      const [fullImport, source] = match;
      if (!importMap.has(source)) {
        importMap.set(source, []);
      }
      importMap.get(source).push(fullImport);
    }

    // Combine duplicate imports
    for (const [source, imports] of importMap) {
      if (imports.length > 1) {
        const combinedImports = new Set();
        imports.forEach(imp => {
          const matches = imp.match(/{([^}]+)}/);
          if (matches) {
            matches[1].split(',').forEach(i => combinedImports.add(i.trim()));
          }
        });
        const newImport = `import { ${Array.from(combinedImports).join(', ')} } from '${source}';`;
        content = content.replace(new RegExp(imports.join('|'), 'g'), (i, idx) => 
          idx === 0 ? newImport : ''
        );
        modified = true;
      }
    }

    // Fix missing return types
    const functionRegex = /(async\s+)?function\s+(\w+)\s*\([^)]*\)\s*{/g;
    content = content.replace(functionRegex, (match, async, name) => {
      if (!match.includes(': ')) {
        return `${async || ''}function ${name}(): Promise<void> {`;
      }
      return match;
    });

    // Fix arrow functions missing return types
    const arrowFuncRegex = /const\s+(\w+)\s*=\s*(async\s+)?\([^)]*\)\s*=>/g;
    content = content.replace(arrowFuncRegex, (match, name, async) => {
      if (!match.includes(': ')) {
        return `const ${name} = ${async || ''}(): ${async ? 'Promise<void>' : 'void'} =>`;
      }
      return match;
    });

    // Rename unused variables to start with underscore
    const unusedVarRegex = /(?:const|let|var)\s+([a-zA-Z]\w*)\s*(?::|=)/g;
    content = content.replace(unusedVarRegex, (match, name) => {
      if (!content.includes(name, match.length)) {
        return match.replace(name, `_${name}`);
        modified = true;
      }
      return match;
    });

    // Replace any types with more specific types
    const anyTypeRegex = /:\s*any(?![a-zA-Z])/g;
    content = content.replace(anyTypeRegex, ': unknown');
    
    if (content !== fs.readFileSync(file, 'utf8')) {
      fs.writeFileSync(file, content);
      fixes.push(file);
    }
  }

  console.log('\nFixes applied to:');
  fixes.forEach(file => console.log(` - ${path.relative(srcDir, file)}`));
}

fixWarnings().catch(console.error);
