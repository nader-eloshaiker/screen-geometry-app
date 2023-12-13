import { defineConfig } from 'orval'

export default defineConfig({
  screenApi: {
    output: {
      mode: 'tags',
      target: './src/generated/openapi/services',
      schemas: './src/generated/openapi/models',
      client: 'react-query',
      mock: false,
      prettier: true,
      clean: true,
      override: {
        mutator: {
          path: './src/hooks/fetch/useApiAxios.ts',
          name: 'useApiAxios',
        },
        query: {
          useQuery: true,
        },
      },
    },
    input: {
      target: './openApi/screenApi.v1.yaml',
    },
  },
})
