import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://countries.trevorblades.com/graphql',
  documents: ['./src/gql/countries/query/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './src/gql/countries/spec/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
    './src/generated/countries/countries-client.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        reactQueryVersion: 5,
        pureMagicComment: true,
        exposeQueryKeys: true,
        exposeFetcher: true,
        fetcher: {
          endpoint: 'https://countries.trevorblades.com/graphql',
          fetchParams: {
            headers: {
              'x-custom-header': 'SomeValue',
              'content-type': 'application/json',
            },
          },
        },
      },
    },
    './src/generated/countries/countries-client.mws.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-msw'],
      config: {
        link: {
          name: 'countryService',
          endpoint: 'https://countries.trevorblades.com/graphql',
        },
      },
    },
  },
}

export default config
