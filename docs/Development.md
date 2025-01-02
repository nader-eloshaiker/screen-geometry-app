# Development

The describes all the development environment decisions, coverying external and internal libraries and development practices.

## Dev Tooling

### Orval

[Orval](https://orval.dev/) is a client API code generator. It takes an [OpenAPI or Swagger spec](https://swagger.io/specification/) (in yaml format) and generates not only the the endpoints complete with urls, but also the data models exchanged between client and server. You can read more here [orval.dev](https://orval.dev/) Note that there are many more tools such as one from Swagger themselves called [OpenAPI Tools](https://github.com/OpenAPITools/openapi-generator) and [Redux Toolkit OpenAPI code-generator](https://redux-toolkit.js.org/rtk-query/usage/code-generation). These are all very good tools, I just settled on this one because the generated code was easy to ready and allowed me to choose the underlying HTTP framework.

#### Output

Orval has been configure to generate:

- Services using [React Query](https://tanstack.com/query) with [AXIOS](https://axios-http.com/) as the HTTP Client
- Data models within the API calls.
- Mock data from the `exmaples` field in the OpenAPI Spec that utilises [Mock Service Worker](https://mswjs.io/)

#### One source of truth

It is supremely accepted that the API spec is the only source of truth for the endpoint. It is the blueprint for the backend and it continually amazes me how little frontend developers refer to it. It is quite common to see human error in frontend API's due to referring to either word of mouth or Jira cards for the Endpoint spec, rather than referring the the OpenAPI/Swagger spec.

#### Reduced development time and effort

You are nolonger have to hand code all the api calls, just import the spec file and run the generator. Within seconds, you have all the api calls and the data models. You will also be assured that the models and urls are identical to the backend.
Another bonus is that you do not have to (and nor should you) write tests for the generated code, you just need to stub them as the generated code is already tested by the authors of the tool. Just remember to exclude it the folder containing the code from the linter, prettier, test runner, coverage reporter, etc.

#### Agile Development

Before starting frontend and backend engineers start development, it is encouraged that a 1 point card be created for the two engineers to sit down and hand craft the new or modified API together, referring to any design or wireframe guide. With the spec generated, this will allow the engineers to work in parallel on the feature, with the confidence that the end result will successfully integrate.

### Vite

I discovered this little gem to replace pnpm and it is lightning quick. You can read more about [Vite](https://vitejs.dev/), but to summarise what they have on their site for convenience:

- `Instant Server Start` On demand file serving over native ESM, no bundling required!
- `Lightning Fast HMR` Hot Module Replacement (HMR) that stays fast regardless of app size.
- `Rich Features` Out-of-the-box support for TypeScript, JSX, CSS and more.
- `Optimized Build` Pre-configured Rollup build with multi-page and library mode support.
- `Universal Plugins` Rollup-superset plugin interface shared between dev and build.
- `Fully Typed APIs` Flexible programmatic APIs with full TypeScript typing.

### MockServiceWorker (mswjs)

MockServiceWorker or [mswjs](https://mswjs.io/), is an API mocking library that allows you to write client-agnostic mocks and reuse them across any frameworks, tools, and environments.

#### Purpose

Although this tool was designed with the purpose of testing, it is also usefull in a real environment to intercept api call and process the request in browser with a local service. So this tool serves to purposes, unit testing api calls and serving api calls.

### Language

- ESlint
- Prettier
- PNPM
  - pnpm is up to 2x faster than npm
  - Files inside node_modules are cloned or hard linked from a single content-addressable storage
  - pnpm has built-in support for multiple packages in a repository
  - pnpm creates a non-flat node_modules by default, so code has no access to arbitrary packages

## Web Dev Frameworks

### Core

- TypeScript
  - This is such an important addition to JavaScript when generating code from an API Spec. Just remember that defining a `type` on an API response is ill advised, stick with `interface`.
  - Type safety may mean more code, but it also means less unit tests and more importantly, less bugs. I remember the days when your code will break unexpectedly due to a missing or incorrect prop!
- React
  - `<StrictMode>` :-(
  - Hooks
  - Functional Components
- React-Router-Dom
- React-Hook-Form
- YUP (Form Resolver)

### GUI

- Styled Components
- TailwindCSS
- ShadCN
- StoryBook

### API

- Axios
- React-Query
- Orval
  - Orval allows the developer to choose which HTTP client is to be used as the underlying framework to actually make the fetch call, in this case React-Query with AXIOS
  - Generate fixtures for api mocks to serve using MockServiceWorker (mswjs)
- localforage (access to in browser indexDB)
