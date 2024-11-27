# msdkx CLI

**msdkx CLI** is a versatile command-line tool developed by [alphadevking](https://github.com/alphadevking) to streamline the creation of applications and packages within the **msdkx** monorepo. Leveraging **Turborepo** and **pnpm**, the CLI ensures consistent project setups, enhancing productivity for large teams.

## Features

- **Framework Support:** Scaffold **Next.js** (App & Pages Router) and **Vite** applications.
- **Styling Options:** Choose between **TailwindCSS** or traditional CSS.
- **Package Manager Flexibility:** Select from **pnpm**, **npm**, or **Yarn**.
- **Custom Templates:** Utilize internal templates for standardized project structures.
- **Git Integration:** Optionally initialize a Git repository with the initial commit.

## Installation

Install the **msdkx CLI** globally using your preferred package manager.

### Using pnpm

```bash
pnpm add -g @msdkx/cli
```

### Using npm

```bash
npm install -g @msdkx/cli
```

### Using Yarn

```bash
yarn global add @msdkx/cli
```

## Usage

### Create a New Application

Use the `create` command followed by your desired application name.

```bash
msdkx create <app-name>
```

**Example:**

```bash
msdkx create my-new-app
```

**Interactive Prompts:**

1. **Choose a Framework:**
   - Next.js (App Router)
   - Next.js (Pages Router)
   - Vite

2. **Add TailwindCSS?**
   - Yes / No

3. **Choose a Package Manager:**
   - pnpm
   - npm
   - yarn

4. **Initialize a Git Repository?**
   - Yes / No

**What Happens Next:**

- **Template Selection:** Based on your choices, the CLI selects the appropriate template.
- **Project Scaffolding:** Copies the selected template to a new directory named after your project.
- **Template Processing:** Renders any EJS templates, injecting dynamic values like the project name.
- **Dependency Installation:** Installs dependencies using your chosen package manager.
- **Git Initialization (Optional):** Initializes a Git repository and makes the initial commit.

### Start the Development Server

Navigate to your project directory and start the development server.

```bash
cd <app-name>
pnpm dev
# or
npm run dev
# or
yarn dev
```

## Contributing

Contributions are welcome! To contribute to the **msdkx CLI**, follow these steps:

1. **Fork the Repository**

   ```bash
   git clone https://github.com/alphadevking/msdkx.git
   cd msdkx
   ```

2. **Navigate to the CLI Package**

   ```bash
   cd packages/cli
   ```

3. **Install Dependencies**

   ```bash
   pnpm install
   ```

4. **Make Your Changes**

5. **Build the CLI**

   ```bash
   pnpm build
   ```

6. **Link the CLI Locally (for testing)**

   ```bash
   pnpm link --global
   ```

7. **Commit and Push Your Changes**

8. **Open a Pull Request**

Please ensure your code follows the project's coding standards and includes relevant tests.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please open an issue on the [GitHub repository](https://github.com/alphadevking/msdkx).

---

## **msdkx Monorepo**
