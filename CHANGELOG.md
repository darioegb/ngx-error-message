## 4.0.0-next.1 (2026-09-08)

* fix(release): pin v4 branch's npm dist-tag to "next" ([380c741](https://github.com/darioegb/ngx-error-message/commit/380c741))
* chore: migrate to Angular 20 ([7e6cf44](https://github.com/darioegb/ngx-error-message/commit/7e6cf44))
* chore: migrate to Angular 21 ([8853fe4](https://github.com/darioegb/ngx-error-message/commit/8853fe4))
* chore: migrate to Angular 22 ([486624f](https://github.com/darioegb/ngx-error-message/commit/486624f))
* chore(release): 4.0.0-next.1 [skip ci] ([b3c8d4d](https://github.com/darioegb/ngx-error-message/commit/b3c8d4d))
* feat!: bump peer floor to Angular >=20, prepare v4 prerelease channel ([075d080](https://github.com/darioegb/ngx-error-message/commit/075d080))

### BREAKING CHANGE

* raises the minimum supported Angular version from
14 to 20. Angular 16-19 consumers should stay on ngx-error-message
3.x until they upgrade Angular.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>

## 4.0.0-next.1 (2026-09-08)

* feat!: bump peer floor to Angular >=20, prepare v4 prerelease channel ([075d080](https://github.com/darioegb/ngx-error-message/commit/075d080))
* chore: migrate to Angular 20 ([7e6cf44](https://github.com/darioegb/ngx-error-message/commit/7e6cf44))
* chore: migrate to Angular 21 ([8853fe4](https://github.com/darioegb/ngx-error-message/commit/8853fe4))
* chore: migrate to Angular 22 ([486624f](https://github.com/darioegb/ngx-error-message/commit/486624f))

### BREAKING CHANGE

* raises the minimum supported Angular version from
14 to 20. Angular 16-19 consumers should stay on ngx-error-message
3.x until they upgrade Angular.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>

## <small>3.1.1 (2026-09-08)</small>

* fix: export the full public API surface from public-api.ts ([2de8bab](https://github.com/darioegb/ngx-error-message/commit/2de8bab))
* fix: first-ever lint pass on the showcase app ([940e765](https://github.com/darioegb/ngx-error-message/commit/940e765))
* fix: memory leak, hard TranslateService dependency, stale param drop ([4b34ad4](https://github.com/darioegb/ngx-error-message/commit/4b34ad4))
* fix: resolve problem with update-readme script ([c37b692](https://github.com/darioegb/ngx-error-message/commit/c37b692))
* fix: restore README compatibility-table update in release pipeline ([1876ade](https://github.com/darioegb/ngx-error-message/commit/1876ade))
* fix: showcase build defaulted to unoptimized output ([b45bf72](https://github.com/darioegb/ngx-error-message/commit/b45bf72))
* fix(ci): build package before semantic-release, harden Sonar step ([f94df61](https://github.com/darioegb/ngx-error-message/commit/f94df61))
* fix(ci): disable pnpm side-effects cache to fix Puppeteer Chrome install ([ca08339](https://github.com/darioegb/ngx-error-message/commit/ca08339))
* fix(ci): exclude docs/ from SonarCloud analysis ([2ae45b4](https://github.com/darioegb/ngx-error-message/commit/2ae45b4))
* fix(ci): pin third-party actions to commit SHA, exclude eslint config from Sonar coverage ([fb8cf92](https://github.com/darioegb/ngx-error-message/commit/fb8cf92))
* fix(ci): skip husky hooks for semantic-release's generated commit ([1a4a16a](https://github.com/darioegb/ngx-error-message/commit/1a4a16a))
* Add explicit token to checkout steps in CI jobs ([369e108](https://github.com/darioegb/ngx-error-message/commit/369e108))
* Initial plan ([c0d746f](https://github.com/darioegb/ngx-error-message/commit/c0d746f))
* Merge pull request #4 from darioegb/create-pull-request/patch ([c49d74a](https://github.com/darioegb/ngx-error-message/commit/c49d74a)), closes [#4](https://github.com/darioegb/ngx-error-message/issues/4)
* Merge pull request #5 from darioegb/create-pull-request/patch ([b6b8868](https://github.com/darioegb/ngx-error-message/commit/b6b8868)), closes [#5](https://github.com/darioegb/ngx-error-message/issues/5)
* Merge pull request #6 from darioegb/feat/v3.2.0-modernization ([7b14644](https://github.com/darioegb/ngx-error-message/commit/7b14644)), closes [#6](https://github.com/darioegb/ngx-error-message/issues/6)
* Merge pull request #7 from darioegb/copilot/fix-ci-checkout-issue ([7b660b3](https://github.com/darioegb/ngx-error-message/commit/7b660b3)), closes [#7](https://github.com/darioegb/ngx-error-message/issues/7)
* Update README.md ([a0fbe4c](https://github.com/darioegb/ngx-error-message/commit/a0fbe4c))
* docs: add Docusaurus site with English and Spanish content ([8204946](https://github.com/darioegb/ngx-error-message/commit/8204946))
* docs: add site logo asset ([8f8c4d8](https://github.com/darioegb/ngx-error-message/commit/8f8c4d8))
* test: cover NgxErrorMessageModule and fix language-change test isolation ([ea811c7](https://github.com/darioegb/ngx-error-message/commit/ea811c7))
* test: update reactive form test ([d76d059](https://github.com/darioegb/ngx-error-message/commit/d76d059))
* test: update test showcase ([e96b044](https://github.com/darioegb/ngx-error-message/commit/e96b044))
* ci: composite setup action, drop Karma container, swap deprecated Sonar action ([4b2445d](https://github.com/darioegb/ngx-error-message/commit/4b2445d))
* ci: read pnpm version from packageManager, pin Node via .nvmrc ([7cf0d81](https://github.com/darioegb/ngx-error-message/commit/7cf0d81))
* build: migrate to ESLint 9 flat config, add lint target for showcase ([2a72a65](https://github.com/darioegb/ngx-error-message/commit/2a72a65))
* build: replace hand-rolled release scripts with semantic-release ([535e08c](https://github.com/darioegb/ngx-error-message/commit/535e08c))
* build: scope pre-commit to staged files via lint-staged, fix hook bugs ([62710da](https://github.com/darioegb/ngx-error-message/commit/62710da))
* style: apply prettier across the whole repo ([05f1bbb](https://github.com/darioegb/ngx-error-message/commit/05f1bbb))
* style: fix pre-existing prettier drift in interfaces file ([ca11fbf](https://github.com/darioegb/ngx-error-message/commit/ca11fbf))
* chore: pin pnpm via packageManager and declare Node engine range ([263545d](https://github.com/darioegb/ngx-error-message/commit/263545d))
* chore: prune dead devDependencies, fix dependencies/devDependencies split ([178b606](https://github.com/darioegb/ngx-error-message/commit/178b606))
* chore: regenerate pnpm-lock.yaml with pnpm 10 ([7ae44cd](https://github.com/darioegb/ngx-error-message/commit/7ae44cd))
* chore: update changelog and README ([76092b5](https://github.com/darioegb/ngx-error-message/commit/76092b5))
* chore: update package version ([c7240e3](https://github.com/darioegb/ngx-error-message/commit/c7240e3))

### Changelog

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

Generated by [`auto-changelog`](https://github.com/CookPete/auto-changelog).

#### [v3.1.0](https://github.com/darioegb/ngx-error-message/compare/v3.0.0...v3.1.0)

> 15 May 2025

- Feat/angular migration [`#3`](https://github.com/darioegb/ngx-error-message/pull/3)
- Update README.md [`#2`](https://github.com/darioegb/ngx-error-message/pull/2)
- chore: migrate to angular 18 [`35f5c1b`](https://github.com/darioegb/ngx-error-message/commit/35f5c1b2228c220cc639bdfcdab26e7957d63b4e)
- chore: migrate to angular 19 [`aa4870d`](https://github.com/darioegb/ngx-error-message/commit/aa4870d8f1ec39c151afee5fe8991dbcc1896ea3)
- chore: migrate to angular 19 & code optimization [`9946415`](https://github.com/darioegb/ngx-error-message/commit/994641519a22fe5725fa932aca10c92d43ae4700)

### [v3.0.0](https://github.com/darioegb/ngx-error-message/compare/v2.2.1...v3.0.0)

> 10 October 2024

- Feat/angular migration [`#1`](https://github.com/darioegb/ngx-error-message/pull/1)
- feat: migrate to Angular 17 and implement improvements [`a787272`](https://github.com/darioegb/ngx-error-message/commit/a787272b666c1b203b240d866e7e704edff75c2b)
- migrate to angular 14 [`176a6a7`](https://github.com/darioegb/ngx-error-message/commit/176a6a7752e91cdbb7226d9f7b2b5980411aa8ff)
- migrate to angular 16 [`3c7e6db`](https://github.com/darioegb/ngx-error-message/commit/3c7e6dbaaf06b36f65299a14ceb6ba291133293e)

#### [v2.2.1](https://github.com/darioegb/ngx-error-message/compare/v2.2.0...v2.2.1)

> 16 August 2022

- Fix/translate not change [`#10`](https://github.com/darioegb/ngx-error-message/pull/10)

#### [v2.2.0](https://github.com/darioegb/ngx-error-message/compare/v2.0.2...v2.2.0)

> 30 May 2022

- Feat/angular migration [`#9`](https://github.com/darioegb/ngx-error-message/pull/9)
- Feat/angular migration [`#8`](https://github.com/darioegb/ngx-error-message/pull/8)
- fix dependencies problems [`55f1686`](https://github.com/darioegb/ngx-error-message/commit/55f16867e3a1bc1e03f4ff781f5a45d8d5a1304f)
- remove ng-package obsolete [`391e4dd`](https://github.com/darioegb/ngx-error-message/commit/391e4dd08543bf68d17c5b0e2aa55b2070eca7aa)
- add pipe to manage error message [`c0ca410`](https://github.com/darioegb/ngx-error-message/commit/c0ca4102afa505bce70c1aa19ceee2fed2b0e5e1)

#### [v2.0.2](https://github.com/darioegb/ngx-error-message/compare/v2.0.1...v2.0.2)

> 26 March 2021

- update documentation and code optimization [`6e27606`](https://github.com/darioegb/ngx-error-message/commit/6e27606f6f42412152e3ace03a7fef75d4d2bdf3)
- fix lint problem [`51ad42c`](https://github.com/darioegb/ngx-error-message/commit/51ad42c488cd98336f125972ee71b1970a44698e)
- Update .gitlab-ci.yml [`f1bd2b3`](https://github.com/darioegb/ngx-error-message/commit/f1bd2b3203a32debf5224e274c249fa7737c647a)

#### [v2.0.1](https://github.com/darioegb/ngx-error-message/compare/v2.0...v2.0.1)

> 25 March 2021

- Develop [`#7`](https://github.com/darioegb/ngx-error-message/pull/7)
- Develop [`#6`](https://github.com/darioegb/ngx-error-message/pull/6)
- Update .gitlab-ci.yml [`eeb2f77`](https://github.com/darioegb/ngx-error-message/commit/eeb2f771f7a297aff4932d3f969aa2854c0833b5)
- Update .gitlab-ci.yml [`2f869a2`](https://github.com/darioegb/ngx-error-message/commit/2f869a2b699bf9fdcd36ae45318df0cfd7849fd7)
- Update .gitlab-ci.yml [`938d13e`](https://github.com/darioegb/ngx-error-message/commit/938d13e2f371aca4003289abf1705d56eefed244)

### [v2.0](https://github.com/darioegb/ngx-error-message/compare/1.3...v2.0)

> 22 March 2021

- Develop [`#5`](https://github.com/darioegb/ngx-error-message/pull/5)
- Develop [`#4`](https://github.com/darioegb/ngx-error-message/pull/4)
- separate jobs for testing and sonar [`164ed8f`](https://github.com/darioegb/ngx-error-message/commit/164ed8f64abcd3f245325b5be873b161b6eb943e)

#### [1.3](https://github.com/darioegb/ngx-error-message/compare/v1.2...1.3)

> 7 November 2020

- add live example update documentation [`#2`](https://github.com/darioegb/ngx-error-message/pull/2)
- Add coverage to ngx-error-message [`2b13176`](https://github.com/darioegb/ngx-error-message/commit/2b1317625dc106ad47feb28ca7d161d447155d73)
- add coverage to lib [`68fcca9`](https://github.com/darioegb/ngx-error-message/commit/68fcca9ccac1208156d4ccfa9fc349a8582e823d)
- add puppeteer for test error [`51a6955`](https://github.com/darioegb/ngx-error-message/commit/51a69557d2fbb07f2c23174c6f5ddf2d8732d255)

#### [v1.2](https://github.com/darioegb/ngx-error-message/compare/v1.0...v1.2)

> 29 May 2020

- optimize library service [`#1`](https://github.com/darioegb/ngx-error-message/pull/1)

#### v1.0

> 16 May 2020

- initial commit [`39a401e`](https://github.com/darioegb/ngx-error-message/commit/39a401e3cf10bacb0dca7f79d9e5bbb6e3fcce5f)
- initial commit [`35d4628`](https://github.com/darioegb/ngx-error-message/commit/35d4628f241056eb4ccf5717b0774895d218ee78)
- fix name directive [`cd85df4`](https://github.com/darioegb/ngx-error-message/commit/cd85df419ffb8a8ece634f82f6a8371986381838)
