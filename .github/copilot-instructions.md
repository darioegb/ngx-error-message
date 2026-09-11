# Copilot instructions for ngx-error-message

This is an Angular 22 workspace (library peer floor: Angular >= 20) built with pnpm. Two projects:

- `projects/ngx-error-message/` — the published library. Two entry points: the root (`ngx-error-message`) and a secondary one at `ngx-translate/` (`ngx-error-message/ngx-translate`) that adapts `@ngx-translate/core`, which is an optional peer dependency.
- `projects/ngx-error-message-showcase/` — a demo/test Angular app exercising both entry points; not published.

## Architecture

- The directive (`ngx-error-message.directive.ts`) owns all reactive state as `computed()` signals, bridged from `AbstractControl.events` (Angular Forms isn't signal-based). The presenter component it creates is a plain `OnPush` component with two inputs — no lifecycle, no DI beyond its own inputs.
- Message resolution goes through the `NGX_ERROR_MESSAGE_TRANSLATOR` injection token (root-provided no-op by default). `withNgxTranslate()`, from the secondary entry point, overrides it with an `@ngx-translate/core`-backed implementation. Never import `@ngx-translate/core` from anywhere reachable from the root `public-api.ts` — that would make it a hard dependency again.
- Providers compose like Angular's own `provideHttpClient(withXhr(), ...)`: `provideNgxErrorMessage(...features: Provider[][])`, with `withErrorMessageConfig()` and `withNgxTranslate()` as features. Don't reintroduce a config-object positional parameter.
- `NgxErrorMessageModule` is deprecated but kept working — it forwards to `provideNgxErrorMessage()`. Don't add anything to it that requires `@ngx-translate/core` at the module level.

## Testing

- Tests run on Vitest via `@angular/build:unit-test`, not Karma.
- `pnpm test:lib` runs **two** separate `angular.json` targets: `test-ngx-translate` (the secondary entry point's specs) and `test` (everything else). They're isolated on purpose: importing across entry points by package name (`from 'ngx-error-message'`) resolves through `dist/`, which is a _different_ module instance than source-transpiled files in the same run — mixing them breaks DI token identity and corrupts coverage. `test:lib` builds the library first; a bare `ng test ngx-error-message` without that build will fail on a clean checkout.
- Prefer a local fake (`{ provide: NGX_ERROR_MESSAGE_TRANSLATOR, useValue: new FakeTranslator() }`) over importing `withNgxTranslate()` across entry points in a spec, for the same reason.

## Conventions

- Conventional Commits, enforced by commitlint; `semantic-release` derives the version and changelog from them. Never hand-edit `CHANGELOG.md`, the library's `version`, or the compatibility tables in `README.md` / `docs/docs/intro.md`.
- `docs/` is a fully independent Docusaurus project (own `package.json`, own lockfile) — not part of any pnpm workspace with the root project.
