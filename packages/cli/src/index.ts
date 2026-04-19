#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { version } from '../package.json';
import fs from 'fs-extra';
import path from 'path';
import ejs from 'ejs';
import { execSync } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

const program = new Command();

const templatesDir = path.resolve(__dirname, '../../templates');

const packageManagers = ['pnpm', 'npm', 'yarn'] as const;
type PackageManager = typeof packageManagers[number];

const isExitPromptError = (err: unknown): boolean =>
  err instanceof Error && err.constructor.name === 'ExitPromptError';

const isPackageManagerInstalled = (pm: PackageManager): boolean => {
  try {
    execSync(`${pm} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

const processEJSFiles = (dirPath: string, vars: Record<string, string>): void => {
  const entries = fs.readdirSync(dirPath);
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry);
    if (fs.lstatSync(fullPath).isDirectory()) {
      processEJSFiles(fullPath, vars);
    } else if (path.extname(entry) === '.ejs') {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const rendered = ejs.render(content, vars);
      fs.writeFileSync(fullPath.replace(/\.ejs$/, ''), rendered);
      fs.unlinkSync(fullPath);
    }
  }
};

const injectProjectName = (targetPath: string, projectName: string): void => {
  const pkgPath = path.join(targetPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    const pkg = fs.readJsonSync(pkgPath);
    pkg.name = projectName;
    fs.writeJsonSync(pkgPath, pkg, { spaces: 2 });
  }
};

program
  .name('msdkx')
  .version(version)
  .description('CLI tool to scaffold full-stack applications');

program
  .command('list')
  .description('List all available templates')
  .action(() => {
    if (!fs.existsSync(templatesDir)) {
      console.error(chalk.red('\nTemplates directory not found.\n'));
      process.exit(1);
    }
    const templates = fs.readdirSync(templatesDir).filter((t) =>
      fs.lstatSync(path.join(templatesDir, t)).isDirectory()
    );
    console.log(chalk.bold('\nAvailable templates:\n'));
    templates.forEach((t) => console.log('  ' + chalk.cyan('•') + ' ' + t));
    console.log();
  });

program
  .command('create [app-name]')
  .description('Scaffold a new application')
  .option('--skip-install', 'Skip dependency installation')
  .option('--skip-git', 'Skip git initialization')
  .action(async (appName: string | undefined, options: { skipInstall?: boolean; skipGit?: boolean }) => {
    try {
      const { skipInstall, skipGit } = options;

      if (!appName) {
        const { name } = await inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Project name:',
            default: 'my-app',
            validate: (v: string) => v.trim().length > 0 || 'Name cannot be empty',
          },
        ]);
        appName = name.trim();
      }

      const resolvedName = appName as string;
      const useCwd = resolvedName === '.';
      const projectName: string = useCwd ? path.basename(process.cwd()) : resolvedName;

      console.log(chalk.bold(`\nmsdkx — creating "${projectName}"\n`));

      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'framework',
          message: 'Choose a framework:',
          choices: [
            { name: 'Next.js (App Router)', value: 'next-app-router' },
            { name: 'Next.js (Pages Router)', value: 'next-pages-router' },
            { name: 'Vite + React', value: 'vite' },
          ],
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
          when: () => !skipInstall,
        },
      ]);

      const packageManager: PackageManager = answers.packageManager ?? 'pnpm';
      const templateName = `${answers.framework}-${answers.tailwind ? 'tailwind' : 'css'}`;
      const templatePath = path.join(templatesDir, templateName);

      if (!fs.existsSync(templatePath)) {
        console.error(chalk.red(`\nTemplate "${templateName}" not found.\n`));
        process.exit(1);
      }

      const targetPath = useCwd ? process.cwd() : path.resolve(process.cwd(), projectName);
      if (!useCwd && fs.existsSync(targetPath)) {
        console.error(chalk.red(`\nDirectory "${projectName}" already exists.\n`));
        process.exit(1);
      }

      if (!skipInstall && !isPackageManagerInstalled(packageManager)) {
        console.error(chalk.red(`\n${packageManager} is not installed. Please install it first.\n`));
        process.exit(1);
      }

      const scaffoldSpinner = ora(`Scaffolding "${projectName}" from ${templateName}...`).start();
      try {
        fs.copySync(templatePath, targetPath, { overwrite: useCwd, errorOnExist: false });
        processEJSFiles(targetPath, { projectName });
        injectProjectName(targetPath, projectName);
        scaffoldSpinner.succeed(chalk.green('Project scaffolded!'));
      } catch (err) {
        scaffoldSpinner.fail(chalk.red('Failed to scaffold project.'));
        console.error((err as Error).message);
        process.exit(1);
      }

      if (!skipInstall) {
        const installSpinner = ora(`Installing dependencies with ${packageManager}...`).start();
        try {
          execSync(`${packageManager} install`, { cwd: targetPath, stdio: 'pipe' });
          installSpinner.succeed(chalk.green('Dependencies installed!'));
        } catch (err) {
          installSpinner.fail(chalk.yellow('Dependency installation failed — run it manually.'));
          console.error(chalk.dim((err as Error).message));
        }
      }

      if (!skipGit) {
        const { initGit } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'initGit',
            message: 'Initialize a Git repository?',
            default: true,
          },
        ]);

        if (initGit) {
          const gitSpinner = ora('Initializing git...').start();
          try {
            execSync('git init', { cwd: targetPath, stdio: 'pipe' });
            execSync('git add .', { cwd: targetPath, stdio: 'pipe' });
            execSync('git commit -m "Initial commit"', { cwd: targetPath, stdio: 'pipe' });
            gitSpinner.succeed(chalk.green('Git repository initialized!'));
          } catch (err) {
            gitSpinner.fail(chalk.yellow('Git init failed — initialize manually.'));
            console.error(chalk.dim((err as Error).message));
          }
        }
      }

      const devCmd = packageManager === 'npm' ? 'npm run dev' : `${packageManager} dev`;

      console.log('\n' + chalk.bold.green('✓ Done!'));
      console.log(chalk.dim('\nGet started:'));
      if (!useCwd) console.log('  ' + chalk.cyan(`cd ${projectName}`));
      if (skipInstall) console.log('  ' + chalk.cyan(`${packageManager} install`));
      console.log('  ' + chalk.cyan(devCmd) + '\n');
    } catch (err) {
      if (isExitPromptError(err)) {
        console.log(chalk.dim('\n\nCancelled.'));
        process.exit(0);
      }
      throw err;
    }
  });

program.parse(process.argv);
