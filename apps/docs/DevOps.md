# DevOps

[GitHub Actions](https://github.com/features/actions) Workflow is utilised for all application CI/CD

## CI/CD

The repo makes use of GitHub actions for running actions, GitHub pages for hosting reports and Cloudflare for hosting the app

Actions are triggered on the following events:

### Push to feature branch: Run Validation Action

Run Validation step consisting of:

- pnpm cache management to store dependencies based on package lock hash
- install
- build
- lint
- unit tests
- report coverage

### Push to main branch from feature branch: Run CI/CD Action

- Run validation step
- pnpm cache management to store dependencies based on package lock hash
- Generate a PR release to main with version bump and changelog if not preset or else update existing
- Build and deploy app with source map for debugging to cloudflare pages develop environment using [https://develop.screengeometry.pages.dev](https://develop.screengeometry.pages.dev)
- Build and deploy storybook asset to github pages [https://nader-eloshaiker.github.io/screen-geometry-app/storybook](https://nader-eloshaiker.github.io/screen-geometry-app/storybook)
- Build and deploy coverage asset to github pages[https://nader-eloshaiker.github.io/screen-geometry-app/coverage](https://nader-eloshaiker.github.io/screen-geometry-app/coverage)

### Push to release branch

- Run validation step, this is to facilitate merging back to main.

### Push to main from release branch: Run Release Deployment Action

- Run validation step
- pnpm cache management to store dependencies based on package lock hash
- Build production and deploy app to cloudflare pages production environment using [https://staging.screengeometry.pages.dev](https://staging.screengeometry.pages.dev)
