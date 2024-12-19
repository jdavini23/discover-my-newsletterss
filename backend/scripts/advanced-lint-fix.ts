#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { ESLint } from 'eslint';

interface LintFix {
  file: string;
  changes: string[];
}

async function advancedLintFix() {
  const srcDir = path.resolve(__dirname, '../src');
  
  // Initialize ESLint with fix enabled
  const eslint = new ESLint({
    fix: true,
    extensions: ['.ts', '.tsx'],
  });

  // Function to recursively find TypeScript files
  function findTsFiles(dir: string): string[] {
    const files: string[] = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...findTsFiles(fullPath));
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }

    return files;
  }

  // Find all TypeScript files
  const tsFiles = findTsFiles(srcDir);
  console.log(`Found ${tsFiles.length} TypeScript files to process.`);

  // Track changes
  const fixedFiles: LintFix[] = [];

  // Process each file
  for (const file of tsFiles) {
    try {
      // Read file contents
      const fileContents = fs.readFileSync(file, 'utf8');

      // Lint and fix the file
      const results = await eslint.lintText(fileContents, {
        filePath: file,
      });

      // Analyze linting results
      const result = results[0];
      const changes: string[] = [];

      // Check for specific linting issues
      if (result.messages.length > 0) {
        result.messages.forEach(message => {
          // Track specific types of changes
          if (message.ruleId === '@typescript-eslint/no-unused-vars') {
            changes.push(`Removed unused variable: ${message.message}`);
          }
          if (message.ruleId === 'no-duplicate-imports') {
            changes.push(`Removed duplicate import: ${message.message}`);
          }
          if (message.ruleId === '@typescript-eslint/explicit-function-return-type') {
            changes.push(`Added missing return type: ${message.message}`);
          }
        });

        // If there are fixable issues, write the fixed contents
        if (result.output) {
          fs.writeFileSync(file, result.output);
          
          // Only add to fixedFiles if there were actual changes
          if (changes.length > 0) {
            fixedFiles.push({ file, changes });
          }
        }
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  // Generate detailed report
  console.log('\nLinting Fix Report:');
  console.log(`Total files processed: ${tsFiles.length}`);
  console.log(`Files changed: ${fixedFiles.length}`);
  
  // Detailed changes
  if (fixedFiles.length > 0) {
    console.log('\nDetailed Changes:');
    fixedFiles.forEach(fix => {
      console.log(`\nFile: ${path.relative(srcDir, fix.file)}`);
      fix.changes.forEach(change => console.log(`- ${change}`));
    });
  }
}

// Run the advanced linting fix
advancedLintFix().catch(error => {
  console.error('Error in advanced linting fix script:', error);
  process.exit(1);
});
