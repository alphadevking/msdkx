#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';
import { execSync } from 'child_process';

const program = new Command();

// Define the path to the templates directory
const templatesDir = path.resolve(__dirname, '../../templates');

// Define supported package managers
const packageManagers = ['pnpm', 'npm', 'yarn'] as const;
type PackageManager = typeof packageManagers[number];

program
  .version('0.1.0')
  .description('msdkx CLI to scaffold applications and packages');

program
  .command('create <app-name>')
  .description('Create a new application')
  .action(async (appName) => {
    // Prompt the user for framework, TailwindCSS, and package manager
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'framework',
        message: 'Choose a framework:',
        choices: ['Next.js (App Router)', 'Next.js (Pages Router)', 'Vite'],
      },
      {
        type: 'confirm',
        name: 'tailwind',
        message: 'Add TailwindCSS?',
        default: true,
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Choose a package manager:',
        choices: packageManagers,
        default: 'pnpm',
      },
    ]);

    let templateName = '';

    switch (answers.framework) {
      case 'Next.js (App Router)':
        templateName = answers.tailwind ? 'next-app-router-tailwind' : 'next-app-router-css';
        break;
      case 'Next.js (Pages Router)':
        templateName = answers.tailwind ? 'next-pages-router-tailwind' : 'next-pages-router-css';
        break;
      case 'Vite':
        templateName = answers.tailwind ? 'vite-tailwind' : 'vite-css';
        break;
      default:
        console.error('Unknown framework');
        process.exit(1);
    }

    const selectedTemplatePath = path.join(templatesDir, templateName);

    if (!fs.existsSync(selectedTemplatePath)) {
      console.error(`Template "${templateName}" does not exist.`);
      process.exit(1);
    }

    const targetPath = path.resolve(process.cwd(), appName);

    if (fs.existsSync(targetPath)) {
      console.error(`Directory "${appName}" already exists. Please choose a different project name.`);
      process.exit(1);
    }

    console.log(`\nScaffolding project "${appName}" using template "${templateName}"...\n`);

    // Copy template to target directory
    fs.copySync(selectedTemplatePath, targetPath, {
      overwrite: false,
      errorOnExist: true,
    });

    // Process EJS templates (if any)
    const processEJSTemplates = async () => {
      const files = fs.readdirSync(targetPath);

      for (const file of files) {
        const filePath = path.join(targetPath, file);
        if (fs.lstatSync(filePath).isFile() && path.extname(file) === '.ejs') {
          const content = fs.readFileSync(filePath, 'utf-8');
          const rendered = ejs.render(content, { projectName: appName });
          const newFilePath = filePath.replace('.ejs', '');
          fs.writeFileSync(newFilePath, rendered);
          fs.unlinkSync(filePath);
        }
      }
    };

    await processEJSTemplates();

    // Validate the selected package manager is installed
    const isPackageManagerInstalled = (pm: PackageManager): boolean => {
      try {
        execSync(`${pm} --version`, { stdio: 'ignore' });
        return true;
      } catch {
        return false;
      }
    };

    if (!isPackageManagerInstalled(answers.packageManager)) {
      console.error(
        `\nError: ${answers.packageManager} is not installed on your system. Please install it and try again.\n`
      );
      process.exit(1);
    }

    // Install dependencies using the selected package manager
    const installDependencies = () => {
      console.log(`\nInstalling dependencies using ${answers.packageManager}...\n`);
      try {
        switch (answers.packageManager) {
          case 'pnpm':
            execSync('pnpm install', { cwd: targetPath, stdio: 'inherit' });
            break;
          case 'npm':
            execSync('npm install', { cwd: targetPath, stdio: 'inherit' });
            break;
          case 'yarn':
            execSync('yarn install', { cwd: targetPath, stdio: 'inherit' });
            break;
          default:
            throw new Error('Unsupported package manager.');
        }
      } catch (error) {
        console.error(`\nError installing dependencies: ${(error as Error).message}\n`);
        process.exit(1);
      }
    };

    installDependencies();

    // Optionally, initialize a Git repository
    const initializeGit = async () => {
      const gitAnswers = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'initGit',
          message: 'Initialize a Git repository?',
          default: true,
        },
      ]);

      if (gitAnswers.initGit) {
        try {
          execSync('git init', { cwd: targetPath, stdio: 'inherit' });
          execSync('git add .', { cwd: targetPath, stdio: 'inherit' });
          execSync('git commit -m "Initial commit"', { cwd: targetPath, stdio: 'inherit' });
          console.log('\nGit repository initialized.\n');
        } catch (error) {
          console.error(`\nError initializing Git repository: ${(error as Error).message}\n`);
        }
      }
    };

    await initializeGit();

    console.log(`\nApplication "${appName}" created successfully!\n`);
    console.log(`\nNext Steps:\n`);
    console.log(`  1. Navigate to your project:\n     cd ${appName}\n`);
    console.log(`  2. Start the development server:\n     ${answers.packageManager === 'yarn' ? 'yarn dev' : answers.packageManager === 'npm' ? 'npm run dev' : 'pnpm dev'}\n`);
  });

program.parse(process.argv);
