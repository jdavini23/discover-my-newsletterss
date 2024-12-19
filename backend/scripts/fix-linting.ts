#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import { ESLint } from 'eslint';

async function fixLintingIssues() {
  const srcDir = path.resolve(__dirname, '../src');
  
  // Initialize ESLint
  const eslint = new ESLint({
    fix: true,
    useEslintrc: true,
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
  const changedFiles: string[] = [];

  // Process each file
  for (const file of tsFiles) {
    try {
      // Read file contents
      const fileContents = fs.readFileSync(file, 'utf8');

      // Lint and fix the file
      const results = await eslint.lintFiles([file]);

      // Check if there are any fixable issues
      if (results[0].output) {
        // Write fixed contents back to file
        fs.writeFileSync(file, results[0].output);
        changedFiles.push(file);
        console.log(`Fixed linting issues in: ${path.relative(srcDir, file)}`);
      }
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }

  console.log('\nLinting fix summary:');
  console.log(`Total files processed: ${tsFiles.length}`);
  console.log(`Files changed: ${changedFiles.length}`);
  console.log('Changed files:');
  changedFiles.forEach(file => console.log(`- ${path.relative(srcDir, file)}`));
}

// Run the linting fix
fixLintingIssues().catch(error => {
  console.error('Error in linting fix script:', error);
  process.exit(1);
});
