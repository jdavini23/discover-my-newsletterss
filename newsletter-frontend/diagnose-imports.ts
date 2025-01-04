import * as fs from 'fs';
import * as path from 'path';

/**
 * Fixes import syntax in a given file by normalizing and cleaning up import statements.
 *
 * @param {string} filePath - Absolute path to the file to be processed
 * @throws {Error} If file cannot be read or written
 */
function fixImportSyntax(filePath: string): void {
  try {
    // Read file content with explicit encoding
    let content: string = fs.readFileSync(filePath, { encoding: 'utf8' });

    // Remove problematic import lines
    content = content.replace(/^import\s*{[^}]*}\s*from\s*['"][^'"]*['"];?/gm, '');

    // Normalize import statements
    content = content.replace(
      /import\s*(\w+)\s*from\s*['"]([^'"]+)['"]/g,
      'import { $1 } from "$2"'
    );

    // Remove duplicate or malformed import lines
    const importLines: string[] = content.match(/^import\s+.*$/gm) || [];
    const uniqueImports: string[] = [...new Set(importLines)];

    content = content.replace(/^import\s+.*$/gm, '');
    content = uniqueImports.join('\n') + '\n\n' + content;

    // Write file with explicit error handling
    fs.writeFileSync(filePath, content, { encoding: 'utf8' });

    console.log(`Successfully processed imports in: ${filePath}`);
  } catch (error) {
    console.error(
      `Error processing file ${filePath}:`,
      error instanceof Error ? error.message : String(error)
    );
    // Optional: implement error recovery or logging mechanism
  }
}

function processDirectory(dir: string) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fixImportSyntax(fullPath);
    }
  });
}

const projectSrc = 'c:/Users/joeda/Desktop/discover-my-newsletters/newsletter-frontend/src';
processDirectory(projectSrc);

console.log('Import syntax fixes completed!');
