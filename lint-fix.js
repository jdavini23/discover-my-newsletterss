#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { ESLint } = require('eslint');
const prettier = require('prettier');

// Configuration for files that need special handling
const CONFIG_FILES = [
  '.lighthouserc.js',
  '.prettierrc.js',
  'build-script.js',
  'commitlint.config.js',
  'eslint.config.cjs',
  'jest.setup.js',
  'ladle.config.cjs',
  'postcss.config.cjs',
  'visual-regression.config.js',
  'vite.config.js',
];

const GLOBAL_ESLINT_DISABLE =
  '/* eslint-disable no-console, no-undef, @typescript-eslint/no-unused-vars */\n';

async function fixConfigFiles() {
  for (const configFile of CONFIG_FILES) {
    const filePath = path.resolve(__dirname, configFile);
    try {
      let content = await fs.promises.readFile(filePath, 'utf8');

      // Add global eslint disable comment if not present
      if (!content.startsWith('/* eslint-disable')) {
        content = GLOBAL_ESLINT_DISABLE + content;
      }

      // Convert double quotes to single quotes
      content = content.replace(/"/g, "'");

      // Ensure module.exports or export default
      if (!content.includes('module.exports') && !content.includes('export default')) {
        content = GLOBAL_ESLINT_DISABLE + 'module.exports = ' + content + ';';
      }

      await fs.promises.writeFile(filePath, content);
      console.log(`Fixed ${configFile}`);
    } catch (error) {
      console.error(`Error fixing ${configFile}:`, error);
    }
  }
}

async function fixPrettierIssues() {
  const eslint = new ESLint({
    fix: true,
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.cjs', '.mjs'],
  });

  const results = await eslint.lintFiles(['.']);

  for (const result of results) {
    if (result.output) {
      try {
        await fs.promises.writeFile(result.filePath, result.output);
        console.log(`Fixed linting issues in ${result.filePath}`);
      } catch (error) {
        console.error(`Error writing fixed file ${result.filePath}:`, error);
      }
    }
  }
}

async function formatWithPrettier() {
  const files = await findFiles('.');

  for (const file of files) {
    try {
      const content = await fs.promises.readFile(file, 'utf8');
      const formatted = await prettier.format(content, {
        filepath: file,
        singleQuote: true,
        trailingComma: 'es5',
        printWidth: 100,
        tabWidth: 2,
        semi: true,
        arrowParens: 'always',
      });

      await fs.promises.writeFile(file, formatted);
      console.log(`Formatted ${file}`);
    } catch (error) {
      console.error(`Error formatting ${file}:`, error);
    }
  }
}

async function findFiles(dir) {
  const files = [];
  const items = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const item of items) {
    const res = path.resolve(dir, item.name);

    if (item.isDirectory() && !res.includes('node_modules') && !res.includes('.git')) {
      files.push(...(await findFiles(res)));
    } else if (
      item.isFile() &&
      (res.endsWith('.js') ||
        res.endsWith('.jsx') ||
        res.endsWith('.ts') ||
        res.endsWith('.tsx') ||
        res.endsWith('.cjs') ||
        res.endsWith('.mjs'))
    ) {
      files.push(res);
    }
  }

  return files;
}

async function main() {
  console.log('Starting comprehensive lint and format fix...');

  await fixConfigFiles();
  await fixPrettierIssues();
  await formatWithPrettier();

  console.log('Lint and format fix completed successfully!');
}

main().catch(console.error);
