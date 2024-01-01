import { defineConfig } from 'orval'

export default defineConfig({
  screenApi: {
    output: {
      mode: 'tags',
      target: './src/openapi/generated/services',
      schemas: './src/openapi/generated/models',
      client: 'react-query',
      mock: false,
      prettier: true,
      clean: true,
      override: {
        mutator: {
          path: './src/hooks/api/useApiAxios.ts',
          name: 'useApiAxios',
        },
        query: {
          useQuery: true,
        },
      },
    },
    input: {
      target: './src/openapi/spec/screenApi.v1.yaml',
    },
  },
})
