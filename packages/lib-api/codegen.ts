import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://countries.trevorblades.com/graphql',
  documents: ['src/gql/**/*.graphql'],
  ignoreNoDocuments: true,
  generates: {
    './src/gql/countries/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
    './src/generated/countries/countries-service.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-query'],
      config: {
        reactQueryVersion: 5,
        pureMagicComment: true,
        exposeQueryKeys: true,
        fetcher: {
          endpoint: 'https://countries.trevorblades.com/graphql',
          fetchParams: {
            headers: {
              'x-custom-header': 'SomeValue',
              'content-type': 'application/json',
            },
          },
        },
        exposeFetcher: true,
      },
    },
  },
}

export default config
