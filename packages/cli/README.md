# @msdkx/cli

[![npm version](https://img.shields.io/npm/v/@msdkx/cli?style=flat-square&color=black)](https://www.npmjs.com/package/@msdkx/cli)
[![npm downloads](https://img.shields.io/npm/dm/@msdkx/cli?style=flat-square&color=black)](https://www.npmjs.com/package/@msdkx/cli)
[![license](https://img.shields.io/npm/l/@msdkx/cli?style=flat-square&color=black)](https://github.com/alphadevking/msdkx/blob/main/LICENSE)

CLI tool to scaffold full-stack applications from curated templates.

---

## Installation

```bash
# pnpm
pnpm add -g @msdkx/cli

# npm
npm install -g @msdkx/cli

# yarn
yarn global add @msdkx/cli
```

---

## Usage

### Create a new app

```bash
msdkx create <app-name>

# scaffold into current directory
msdkx create .

# skip steps
msdkx create my-app --skip-install --skip-git
```

**Interactive prompts:**

1. Framework — Next.js (App Router), Next.js (Pages Router), Vite + React
2. Add TailwindCSS?
3. Package manager — pnpm / npm / yarn
4. Initialize a Git repository?

### List available templates

```bash
msdkx list
```

### Check version

```bash
msdkx --version
```

---

## Options

| Flag | Description |
|---|---|
| `--skip-install` | Skip running the package manager install step |
| `--skip-git` | Skip git init and initial commit |

---

## Templates

| Name | Stack |
|---|---|
| `next-app-router-tailwind` | Next.js App Router + TailwindCSS |
| `next-app-router-css` | Next.js App Router + CSS |
| `next-pages-router-tailwind` | Next.js Pages Router + TailwindCSS |
| `next-pages-router-css` | Next.js Pages Router + CSS |
| `vite-tailwind` | Vite + React + TailwindCSS |
| `vite-css` | Vite + React + CSS |

---

## License

MIT © [alphadevking](https://github.com/alphadevking)
