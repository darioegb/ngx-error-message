# Contributing

## Setup

```bash
nvm use          # Node version pinned in .nvmrc
pnpm install      # frozen lockfile is enforced in CI
pnpm start        # builds the library, then serves the showcase app
```

## Making changes

- Library source lives in `projects/ngx-error-message/`; the `@ngx-translate/core` adapter is a separate secondary entry point at `projects/ngx-error-message/ngx-translate/`. The showcase app that exercises both lives in `projects/ngx-error-message-showcase/`.
- Run `pnpm test:lib` before pushing — it builds the library and runs both the primary and `ngx-translate` Vitest suites (they're isolated into separate `angular.json` targets on purpose; see the comments in `angular.json` if you're touching the test config).
- Run `pnpm lint` and `pnpm format` (or let `lint-staged` do it on commit).
- Documentation site source lives in `docs/` and is a fully independent pnpm project (its own lockfile). `pnpm docs:start` runs it locally.

## Commits

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/) — this is enforced by commitlint on every commit (`.husky/commit-msg`) and drives `semantic-release`'s version bump:

- `fix:` → patch
- `feat:` → minor
- `feat!:` / a `BREAKING CHANGE:` footer → major

Don't hand-edit `CHANGELOG.md`, the library's `version` field, or the compatibility table in `README.md`/`docs/docs/intro.md` — `semantic-release` and its `scripts/*.mjs` hooks generate all of that from your commit messages.

## Branches

`main` is the only long-lived branch — it's the released, stable line (`latest` on npm) and where `semantic-release` publishes from. Open PRs against it directly.

For a long-running breaking-change effort that shouldn't touch `latest` mid-flight, `.releaserc.json`'s `branches` array supports adding a temporary prerelease branch (as `v4` was during the v4.0.0 rewrite, publishing `4.0.0-next.N` under the npm `next` dist-tag) — remove that entry once the branch merges back into `main`.

## Pull requests

CI (`test_lint`, `test_karma`, SonarCloud) must pass. Please don't use `--no-verify` to skip local hooks — if a hook is genuinely wrong, fix the hook instead.
