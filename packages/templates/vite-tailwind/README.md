# Vite + React + Tailwind CSS

Scaffolded by [msdkx CLI](https://www.npmjs.com/package/@msdkx/cli).

**Stack:** Vite 8 · React 19 · Tailwind CSS 4 · TypeScript 6

## Get started

```bash
pnpm dev      # start dev server
pnpm build    # production build
pnpm preview  # preview production build
pnpm lint     # run linter
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project structure

```
src/
  main.tsx    # entry point
  App.tsx     # root component
  index.css   # global styles + Tailwind import
index.html
vite.config.ts
```

## Tailwind CSS

This template uses Tailwind CSS v4 via the Vite plugin — no PostCSS config or `tailwind.config.ts` needed.

```ts
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
```

```css
/* src/index.css */
@import "tailwindcss";
```

## Resources

- [Vite docs](https://vite.dev)
- [Tailwind CSS v4 docs](https://tailwindcss.com/docs)
- [React 19 docs](https://react.dev)
