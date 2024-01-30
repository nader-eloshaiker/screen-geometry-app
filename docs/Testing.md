# Testing

## Unit

Testing makes use of [Vitest](https://vitest.dev/) which is a test runner much like Jest but integrates with the Vite tranformation pipeline and configuration.
It provides a compatible api with Jest making it a drop in raplacement but runs significantly faster than Jest.

### Run test

Initiating test runs and watching for changes is excuted using

    pnpm run test

However, you can bring up a visual console for testing using

    pnpm run test:ui

### Test dashboard

The console can be accessed from the [http://localhost](http://localhost:51204/__vitest__/#/)
They are also published to github pages at [Coverage](https://nader-eloshaiker.github.io/screen-geometry-app/coverage)

### Coverage Reports

Coverage reports are also generated and can be access from from within the testing console above. They are also published to [Coverage Reports](https://nader-eloshaiker.github.io/screen-geometry-app/coverage)

## API Mocking

MockServiceWorker or [mswjs](https://mswjs.io/), is used to intercept API request and serve responses directly. This is utilised in a node testing environment (unit testing environment) using a node interceptor and in browser testing environment (end to end testing environment) using a service worker.

The mock data that was generated using Orval from the `example` field of the OpenAPI spec, is used to provision an instance of mswjs specifically used for unit testing.

## Component

[Storybook interactions](https://storybook.js.org/docs/essentials/interactions) is utilised to run a visual test on managed components. They are also published to [StoryBook Reports](https://nader-eloshaiker.github.io/screen-geometry-app/storybook)

## Smoke
