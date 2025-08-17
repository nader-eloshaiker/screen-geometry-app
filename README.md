# Screen Geometry

[![Validation](https://github.com/nader-eloshaiker/screen-geometry-app/actions/workflows/validation-app.yml/badge.svg)](https://github.com/nader-eloshaiker/screen-geometry-app/actions/workflows/validation-app.yml)
[![CI](https://github.com/nader-eloshaiker/screen-geometry-app/actions/workflows/ci.yml/badge.svg)](https://github.com/nader-eloshaiker/screen-geometry-app/actions/workflows/ci.yml)
[![CD](https://github.com/nader-eloshaiker/screen-geometry-app/actions/workflows/cd.yml/badge.svg)](https://github.com/nader-eloshaiker/screen-geometry-app/actions/workflows/cd.yml)

[![CodeCov](https://codecov.io/gh/nader-eloshaiker/screen-geometry-app/graph/badge.svg?token=FD9467PICM)](https://codecov.io/gh/nader-eloshaiker/screen-geometry-app)

[![CodeCov](https://codecov.io/gh/nader-eloshaiker/screen-geometry-app/graphs/icicle.svg?token=FD9467PICM)](https://codecov.io/gh/nader-eloshaiker/screen-geometry-app)

## App Demo

![Demo video](https://raw.githubusercontent.com/nader-eloshaiker/screen-geometry-app/main/docs/media/demo-anim.webp)

[Read here](./docs/UserGuide.md) for a more detailed explaination

## Description

This is a tool to help visually compare different screen sizes to help you choose which monitor, phone, or tablet to buy. It does this by overlaying different screen sizes ontop of each other for
easy comparison as well as tabulate the specs.

## Purpose

This app is well over engineered and is more for showcasing:

- **Architecture**
- **Tooling**
- **Web Development Frame Works**
- **Design Systems and Style Guides**
- **Testing Frameworks and Practices**
- **Automated code generation**.
- **CI/CD**

## Links

### Deployed Environments

Hosted in [Cloudflare](https://www.cloudflare.com) and is deployed from the main branch.

- Deployment to **Development** environment on every merge to the main branch.
- Deployment to **Production** environment is deployed on a release event.
- Manual deployment to development can be used for feature branches.

### Official App urls

- Production [screengeometry.com](https://screengeometry.com)
- Develop [develop.screengeometry.com](https://develop.screengeometry.com)

### Reports

The reports are hosted in Github Pages and are deployed on every merge to the main branch.

- [Coverage](https://app.codecov.io/gh/nader-eloshaiker/screen-geometry-app/?search=&displayType=list)
- [StoryBook Component Library](https://nader-eloshaiker.github.io/screen-geometry-app)
- [Chromatic Visual Testing](https://www.chromatic.com/library?appId=67764022c3d2470364c49de2)

## Dev'ing the App

### Detailed Reading

- [Development tools and frameworks](./docs/Development.md)
- [Architecture](./docs/Architecture.md)
- [DevOps](./docs/DevOps.md)
- [GitOps](./docs/GitOps.md)
- [Testing](./docs/Testing.md)

Installing dependencies

    npm install -g pnpm
    pnpm i

Run in development

    pnpm start

Build

    pnpm build
