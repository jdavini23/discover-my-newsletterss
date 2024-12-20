#!/usr/bin/env node
const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

async function comprehensiveLintFix() {
  // Initialize ESLint with auto-fix enabled
  const eslint = new ESLint({
    fix: true,
    overrideConfigFile: path.resolve(__dirname, 'eslint.config.js'),
    // Specify specific rules to apply
    baseConfig: {
      rules: {
        // Unused variables and imports
        '@typescript-eslint/no-unused-vars': ['error', { 
          'vars': 'all', 
          'args': 'none', 
          'ignoreRestSiblings': true 
        }],
        'no-duplicate-imports': 'error',

        // Return types and explicit typing
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        
        // Function and complexity limits
        'max-lines-per-function': ['warn', { 
          max: 100, 
          skipBlankLines: true, 
          skipComments: true 
        }],
        'complexity': ['warn', { max: 10 }],
        'max-depth': ['warn', { max: 4 }]
      }
    }
  });

  // Directory to lint
  const srcDir = path.resolve(__dirname, '../src');

  try {
    // Find all TypeScript files
    const tsFiles = glob.sync(`${srcDir}/**/*.{ts,tsx}`);

    // Lint and fix all files
    const results = await eslint.lintFiles(tsFiles);

    // Count files with fixes
    const fixedFiles = results.filter(result => result.output);

    console.log('\n Linting Fix Report:');
    console.log(`Total files processed: ${results.length}`);
    console.log(`Files changed: ${fixedFiles.length}`);

    // Write fixed files
    for (const result of fixedFiles) {
      if (result.output) {
        fs.writeFileSync(result.filePath, result.output);
        console.log(` Fixed: ${path.relative(srcDir, result.filePath)}`);
      }
    }

    // Generate formatter for detailed output
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);
    
    console.log('\n Detailed Linting Results:');
    console.log(resultText);

    // Check if there are any remaining errors
    const errorCount = results.reduce((total, result) => total + result.errorCount, 0);
    const warningCount = results.reduce((total, result) => total + result.warningCount, 0);

    console.log(`\n Total Errors: ${errorCount}`);
    console.log(` Total Warnings: ${warningCount}`);

    // Exit with non-zero code if there are errors
    if (errorCount > 0) {
      process.exit(1);
    }

  } catch (error) {
    console.error(' Error during linting fix:', error);
    process.exit(1);
  }
}

// Run the comprehensive linting fix
comprehensiveLintFix();
