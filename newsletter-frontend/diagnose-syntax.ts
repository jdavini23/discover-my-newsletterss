import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

function fixSyntaxErrors(filePath: string) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove any problematic syntax
    const sourceFile = ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);

    // Check for syntax errors
    const syntaxErrors = sourceFile.parseDiagnostics;

    if (syntaxErrors.length > 0) {
      console.log(`Syntax errors in ${filePath}:`);
      syntaxErrors.forEach(error => {
        console.log(ts.flattenDiagnosticMessageText(error.messageText, '\n'));
      });

      // Attempt to fix common syntax issues
      content = content.replace(
        /^export\s+default\s+function\s*\(\s*\)\s*{/gm,
        'export default function() {'
      );
      content = content.replace(
        /^export\s+const\s+\w+\s*=\s*\(\s*\)\s*=>\s*{/gm,
        'export const $1 = () => {'
      );

      // Remove any lines with syntax errors
      const lines = content.split('\n');
      const cleanedLines = lines.filter(line => {
        // Remove lines with obvious syntax issues
        return !line.match(/^\s*export\s*$/);
      });

      content = cleanedLines.join('\n');

      fs.writeFileSync(filePath, content);
      console.log(`Attempted to fix syntax in ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
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
      fixSyntaxErrors(fullPath);
    }
  });
}

const projectSrc = 'c:/Users/joeda/Desktop/discover-my-newsletters/newsletter-frontend/src';
processDirectory(projectSrc);

console.log('Syntax error diagnosis and fix completed!');
