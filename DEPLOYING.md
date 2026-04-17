# Deploying msdkx

This repo uses [Changesets](https://github.com/changesets/changesets) and GitHub Actions for fully automated versioning and npm publishing.

---

## How it works (fully automated)

Once you push to `main`, the pipeline handles everything:

```
git commit -m "feat: your change"
git push
       │
       ▼
[auto-changeset] reads commit message → creates changeset
       │
       ▼
[release] detects changeset → opens "Version Packages" PR → auto-merges it
       │
       ▼
[release] publishes to npm automatically
```

**You only write code and commit. Everything else is automated.**

---

## Commit message format

The bump type is determined from your commit message prefix:

| Prefix | Bump | Example |
|---|---|---|
| `fix:` | `patch` — `0.1.1 → 0.1.2` | `fix: correct template path on Windows` |
| `feat:` | `minor` — `0.1.1 → 0.2.0` | `feat: add SvelteKit template` |
| `feat!:` or `BREAKING CHANGE` | `major` — `0.1.1 → 1.0.0` | `feat!: rename create command` |
| anything else | `patch` | `chore:`, `docs:`, `refactor:` |

> **Rule:** never use `feat!:` or `BREAKING CHANGE` until the API is intentionally broken or stable.

---

## Manual release (override)

If you need to control the version bump manually:

```bash
# 1. Create a changeset yourself
pnpm changeset

# 2. Commit and push — the auto-changeset step will skip (one already exists)
git add .changeset/
git commit -m "chore: manual changeset"
git push
```

---

## Running checks locally

```bash
pnpm check
```

Runs: audit → lint → type-check → build. Fix failures before pushing.

---

## Required GitHub repo settings

| Setting | Where | Value |
|---|---|---|
| Allow auto-merge | Settings → General | ✅ Enabled |
| `NPM_TOKEN` secret | Settings → Secrets | npm access token with publish rights |

---

## Packages that publish to npm

| Package | npm name |
|---|---|
| `packages/cli` | `@msdkx/cli` |
| `packages/duration_timestamp` | `duratii` |

`apps/` and internal `packages/` (ui, eslint-config, typescript-config) are private and never published.
