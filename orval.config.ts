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
          path: './src/api/mutator/useCustomAxios.ts',
          name: 'useCustomAxios',
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
