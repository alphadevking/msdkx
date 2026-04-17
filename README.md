# msdkx

**Scaffold full-stack apps in seconds.**

A TypeScript-first CLI for Next.js and Vite — TailwindCSS, ESLint, and git ready out of the box.

[![CI](https://github.com/alphadevking/msdkx/actions/workflows/ci.yml/badge.svg)](https://github.com/alphadevking/msdkx/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@msdkx/cli)](https://www.npmjs.com/package/@msdkx/cli)
[![license](https://img.shields.io/github/license/alphadevking/msdkx)](LICENSE)

📖 **[Full documentation → alphadevking.github.io/msdkx](https://alphadevking.github.io/msdkx)**

---

## Quick start

```bash
npx @msdkx/cli create my-app
```

Or with pnpm:

```bash
pnpm dlx @msdkx/cli create my-app
```

---

## What it does

Prompts you for a framework, styling, and package manager — then scaffolds a ready-to-run project in seconds.

```
? Project name: my-app
? Choose a framework: Next.js (App Router)
? Add TailwindCSS? Yes
? Package manager: pnpm

✓ Project scaffolded!
✓ Dependencies installed!
✓ Git repository initialized!

✓ Done!
  cd my-app
  pnpm dev
```

---

## Templates

| Framework | Styling |
|---|---|
| Next.js App Router | TailwindCSS / Vanilla CSS |
| Next.js Pages Router | TailwindCSS / Vanilla CSS |
| Vite + React | TailwindCSS / Vanilla CSS |

---

## CLI commands

```bash
msdkx create [app-name]     # scaffold a new project
msdkx list                  # list available templates
msdkx create . --skip-git   # scaffold into current directory, skip git
msdkx create my-app --skip-install  # scaffold without installing deps
```

---

## Packages

| Package | Version | Description |
|---|---|---|
| [`@msdkx/cli`](packages/cli) | [![npm](https://img.shields.io/npm/v/@msdkx/cli)](https://www.npmjs.com/package/@msdkx/cli) | Scaffolding CLI |
| [`duratii`](packages/duration_timestamp) | [![npm](https://img.shields.io/npm/v/duratii)](https://www.npmjs.com/package/duratii) | Duration & timestamp utilities |

---

## Contributing

See [DEPLOYING.md](DEPLOYING.md) for the release workflow.

1. Fork the repo
2. Create a branch: `git checkout -b feat/your-feature`
3. Commit using conventional commits: `git commit -m "feat: your feature"`
4. Push and open a PR

---

## License

[MIT](LICENSE)
