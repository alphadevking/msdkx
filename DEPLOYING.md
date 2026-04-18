# Deploying msdkx

This repo uses [Changesets](https://github.com/changesets/changesets) for versioning and a manual GitHub Actions workflow for npm publishing.

---

## Release flow

```
1. Make your changes and commit to main
       │
       ▼
2. Create a changeset locally
   pnpm changeset
       │
       ▼
3. Apply the version bump
   pnpm changeset version
       │
       ▼
4. Commit and push
   git add .
   git commit -m "chore: release <package>@<version>"
   git push
       │
       ▼
5. Go to GitHub Actions → "Publish" → Run workflow
```

---

## Step-by-step

### 1. Create a changeset

```bash
pnpm changeset
```

Select which packages changed, choose the bump type (`patch` / `minor` / `major`), write a summary.

### 2. Apply the version bump

```bash
pnpm changeset version
```

This updates `package.json` versions and `CHANGELOG.md` files, and removes the consumed changeset files.

### 3. Commit and push

```bash
git add .
git commit -m "chore: release @msdkx/cli@0.x.x"
git push
```

### 4. Trigger publish

Go to **GitHub → Actions → Publish → Run workflow**.

Use **Dry run: true** first to verify what would be published, then run again with **Dry run: false** to publish for real.

---

## Bump type guide

| Change | Bump | Example |
|---|---|---|
| Bug fix, docs, refactor | `patch` — `0.1.2 → 0.1.3` | Fixed template path on Windows |
| New feature, backwards-compatible | `minor` — `0.1.2 → 0.2.0` | Added SvelteKit template |
| Breaking API change | `major` — `0.1.2 → 1.0.0` | Renamed `create` command |

> Never use `major` until the API is intentionally broken or stable.

---

## Running checks locally

```bash
pnpm check
```

Runs: audit → type-check → build. Fix any failures before pushing.

---

## Required GitHub repo settings

| Setting | Where | Value |
|---|---|---|
| `NPM_TOKEN` secret | Settings → Secrets → Repository secrets | npm **Automation** token |

The token must be an **Automation** type — this bypasses npm 2FA for CI.

---

## Packages that publish to npm

| Package | npm name |
|---|---|
| `packages/cli` | `@msdkx/cli` |
| `packages/duration_timestamp` | `duratii` |

`apps/` and internal `packages/` (eslint-config, typescript-config) are private and never published.
