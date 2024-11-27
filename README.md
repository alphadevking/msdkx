# msdkx Monorepo

**msdkx** is a flexible and scalable monorepo setup powered by **Turborepo** and **pnpm**, designed to manage multiple applications and packages efficiently. It includes a custom CLI tool that allows you to scaffold new projects from predefined templates, supporting various frameworks and styling options. Additionally, the CLI offers the flexibility to choose your preferred package manager (**pnpm**, **npm**, or **Yarn**).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Monorepo Structure](#monorepo-structure)
- [Using the msdkx CLI](#using-the-msdkx-cli)
  - [Create a New Application](#create-a-new-application)
- [Templates](#templates)
- [Publishing Packages](#publishing-packages)
- [Advanced Usage](#advanced-usage)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Prerequisites

Before setting up the **msdkx** monorepo, ensure you have the following installed on your machine:

1. **Node.js** (v14 or later): [Download Node.js](https://nodejs.org/)
2. **pnpm**: A fast, disk space-efficient package manager.
   ```bash
   npm install -g pnpm
   ```
3. **Git**: Version control system. [Download Git](https://git-scm.com/downloads)
4. **Yarn** (optional): If you prefer using Yarn as your package manager.
   ```bash
   npm install -g yarn
   ```

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/msdkx.git
   cd msdkx
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Build the CLI**

   Navigate to the CLI package and build it.

   ```bash
   cd packages/cli
   pnpm build
   ```

4. **Link the CLI Globally**

   This allows you to use the `msdkx` command anywhere on your system.

   ```bash
   pnpm link --global
   ```

## Monorepo Structure

The **msdkx** monorepo is organized to separate applications and reusable packages, ensuring scalability and maintainability.

```
msdkx/
├── apps/
│   ├── next-app-router/
│   │   ├── package.json
│   │   ├── pages/
│   │   ├── public/
│   │   └── ... 
│   ├── next-pages-router/
│   │   ├── package.json
│   │   ├── pages/
│   │   ├── public/
│   │   └── ... 
│   └── vite-app/
│       ├── package.json
│       ├── src/
│       ├── public/
│       └── ... 
├── packages/
│   ├── templates/
│   │   ├── next-app-router-tailwind/
│   │   │   ├── package.json.ejs
│   │   │   ├── tailwind.config.js
│   │   │   ├── postcss.config.js
│   │   │   ├── styles/
│   │   │   │   └── globals.css.ejs
│   │   │   └── ... 
│   │   ├── next-app-router-css/
│   │   │   ├── package.json.ejs
│   │   │   ├── styles/
│   │   │   │   └── globals.css.ejs
│   │   │   └── ... 
│   │   ├── next-pages-router-tailwind/
│   │   │   ├── package.json.ejs
│   │   │   ├── tailwind.config.js
│   │   │   ├── postcss.config.js
│   │   │   ├── styles/
│   │   │   │   └── globals.css.ejs
│   │   │   └── ... 
│   │   ├── next-pages-router-css/
│   │   │   ├── package.json.ejs
│   │   │   ├── styles/
│   │   │   │   └── globals.css.ejs
│   │   │   └── ... 
│   │   ├── vite-tailwind/
│   │   │   ├── package.json.ejs
│   │   │   ├── tailwind.config.js
│   │   │   ├── postcss.config.js
│   │   │   ├── src/
│   │   │   │   └── main.css.ejs
│   │   │   └── ... 
│   │   └── vite-css/
│   │       ├── package.json.ejs
│   │       ├── src/
│   │       │   └── main.css
│   │       └── ... 
│   ├── ui/
│   │   ├── package.json
│   │   ├── src/
│   │   └── ... 
│   └── ... 
├── node_modules/
├── package.json
├── pnpm-workspace.yaml
└── turbo.json
```

- **apps/**: Contains your application projects.
- **packages/**: Contains reusable packages and templates.
  - **templates/**: Predefined templates for scaffolding new applications.
  - **ui/**: Example of a reusable UI library.

## Using the msdkx CLI

The **msdkx** CLI tool allows you to scaffold new applications from predefined templates within the monorepo. It supports multiple frameworks, styling options, and package managers.

### Create a New Application

To create a new application, use the `create` command followed by your desired application name.

```bash
msdkx create <app-name>
```

**Example:**

```bash
msdkx create my-new-app
```

**Interactive Prompts:**

1. **Choose a Framework:**
   - `Next.js (App Router)`
   - `Next.js (Pages Router)`
   - `Vite`

2. **Add TailwindCSS?**
   - `Yes`
   - `No`

3. **Choose a Package Manager:**
   - `pnpm`
   - `npm`
   - `yarn`

**Example Flow:**

```bash
$ msdkx create my-new-app
? Choose a framework: Next.js (App Router)
? Add TailwindCSS? Yes
? Choose a package manager: pnpm
```

**What Happens Next:**

1. **Template Selection:**
   - Based on your choices, the CLI selects the appropriate template from `packages/templates/`.

2. **Project Scaffolding:**
   - Copies the selected template to a new directory named `my-new-app`.

3. **Template Processing:**
   - Renders any EJS templates, injecting dynamic values like the project name.

4. **Dependency Installation:**
   - Installs dependencies using your chosen package manager (`pnpm`, `npm`, or `yarn`).

5. **Git Initialization (Optional):**
   - Prompts you to initialize a Git repository for your new project.

6. **Completion:**
   - Displays a success message with next steps.

**Next Steps:**

Navigate to your new project directory and start the development server.

```bash
cd my-new-app
pnpm dev
# or
npm run dev
# or
yarn dev
```

## Templates

Templates are located in the `packages/templates/` directory. Each template corresponds to a specific combination of framework and styling option.

### Available Templates

1. **Next.js (App Router) + TailwindCSS** (Available Soon)
   - Directory: `packages/templates/next-app-router-tailwind/`

2. **Next.js (App Router) + CSS** (Available Soon)
   - Directory: `packages/templates/next-app-router-css/`

3. **Next.js (Pages Router) + TailwindCSS** (Available Soon)
   - Directory: `packages/templates/next-pages-router-tailwind/`

4. **Next.js (Pages Router) + CSS** (Available Soon)
   - Directory: `packages/templates/next-pages-router-css/`

5. **Vite + TailwindCSS**
   - Directory: `packages/templates/vite-tailwind/`

6. **Vite + CSS** (Available Soon)
   - Directory: `packages/templates/vite-css/`

### Customizing Templates

You can modify or add new templates by creating new directories under `packages/templates/` following the existing structure. Ensure each template includes necessary configuration files and EJS templates for dynamic content.

**Example: Adding a New Template**

To add a new template for `Next.js (App Router) + Styled-Components`:

1. **Create Template Directory**

   ```bash
   mkdir -p packages/templates/next-app-router-styled-components
   ```

2. **Populate Template Files**

   - `package.json.ejs`
   - `styled-components.config.js`
   - Any other necessary files.

3. **Update CLI**

   Modify the CLI script to include the new template option in the `create` command.

## Publishing Packages

Each package and application within the monorepo can be published to npm, allowing you to reuse and share them across different projects.

### Steps to Publish a Package

1. **Navigate to the Package Directory**

   ```bash
   cd packages/ui
   ```

2. **Ensure `package.json` is Configured**

   ```json
   {
     "name": "@msdkx/ui",
     "version": "0.1.0",
     "main": "dist/index.js",
     "types": "dist/index.d.ts",
     "scripts": {
       "build": "tsc --build",
       "lint": "eslint .",
       "test": "jest"
     },
     "dependencies": {
       "react": "^18.0.0"
     },
     "devDependencies": {
       "typescript": "^4.0.0",
       "eslint": "^7.0.0",
       "jest": "^27.0.0"
     }
   }
   ```

3. **Build the Package**

   ```bash
   pnpm build
   ```

4. **Publish to npm**

   ```bash
   pnpm publish --access public
   ```

   **Notes:**
   - Ensure the package name is unique and scoped appropriately.
   - Set `"private": false` in `package.json` if you intend to publish.

### Consuming Published Packages

In another project, install the published package using your preferred package manager.

```bash
pnpm add @msdkx/ui
# or
npm install @msdkx/ui
# or
yarn add @msdkx/ui
```

Then, import and use it in your code.

```javascript
import { Button } from '@msdkx/ui';

function App() {
  return <Button>Click me</Button>;
}

export default App;
```

## Advanced Usage

### Customizing the CLI

You can extend the CLI to support additional features such as:

- **Adding More Commands:** For example, `add-package`, `remove-app`, etc.
- **Handling Environment Variables:** Injecting environment-specific configurations.
- **Integrating with CI/CD:** Automate deployments or testing after scaffolding.

### Managing Dependencies

Utilize **pnpm's** workspace features to manage dependencies across packages efficiently. Ensure that shared dependencies are hoisted appropriately to minimize duplication.

### Enhancing Templates with EJS

Use EJS templating to inject dynamic content into your templates.

**Example: `package.json.ejs`**

```json
{
  "name": "<%= projectName %>",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "tailwindcss": "^3.0.0",
    "postcss": "^8.0.0",
    "autoprefixer": "^10.0.0"
  }
}
```

During scaffolding, `<%= projectName %>` will be replaced with the actual project name.

## Troubleshooting

### Common Issues

1. **Package Manager Not Installed**

   **Error:**
   ```
   Error: pnpm is not installed on your system. Please install it and try again.
   ```

   **Solution:**
   Install the required package manager.

   ```bash
   npm install -g pnpm
   # or
   npm install -g yarn
   ```

2. **Template Not Found**

   **Error:**
   ```
   Template "next-app-router-tailwind" does not exist.
   ```

   **Solution:**
   Ensure the template exists in `packages/templates/`. Add the missing template if necessary.

3. **Directory Already Exists**

   **Error:**
   ```
   Directory "my-new-app" already exists. Please choose a different project name.
   ```

   **Solution:**
   Choose a unique project name or remove the existing directory.

### Getting Help

If you encounter issues not covered here, consider:

- **Checking Logs:** Review the console output for error messages.
- **Reinstalling Dependencies:** Sometimes, reinstalling can resolve conflicts.
  ```bash
  pnpm install
  ```
- **Contacting Support:** Reach out to the project maintainers or open an issue on the repository.

## Contributing

Contributions are welcome! To contribute:

1. **Fork the Repository**

   ```bash
   git clone https://github.com/yourusername/msdkx.git
   cd msdkx
   ```

2. **Create a New Branch**

   ```bash
   git checkout -b feature/new-feature
   ```

3. **Make Your Changes**

4. **Commit Your Changes**

   ```bash
   git commit -m "Add new feature"
   ```

5. **Push to Your Fork**

   ```bash
   git push origin feature/new-feature
   ```

6. **Open a Pull Request**

   Describe your changes and submit for review.

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- [Turborepo](https://turborepo.org/) for the powerful monorepo management.
- [pnpm](https://pnpm.io/) for efficient package management.
- [Commander](https://github.com/tj/commander.js/) and [Inquirer](https://github.com/SBoudrias/Inquirer.js/) for building the CLI tool.
- [EJS](https://ejs.co/) for templating support.
