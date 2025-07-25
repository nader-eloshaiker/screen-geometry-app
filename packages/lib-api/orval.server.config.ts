import { defineConfig } from 'orval'

export default defineConfig({
  screenApi: {
    output: {
      workspace: 'src/generated',
      mode: 'tags-split',
      target: './server/services',
      schemas: './server/models',
      indexFiles: true,
      client: 'react-query',
      mock: {
        type: 'msw',
        delay: 10, // 10ms to speed up unit tests
        useExamples: true,
      },
      prettier: true,
      tslint: true,
      clean: true,
      override: {
        header: (info) => [
          'Generated by orval 🍺',
          'Do not edit manually.',
          ...(info.title ? [info.title] : []),
          ...(info.description ? [info.description] : []),
        ],
        mutator: {
          path: '../axios/apiClient.ts',
          name: 'serverApiClient',
        },
        query: {
          useQuery: true,
        },
      },
    },
    input: {
      target: '../spec-server/dist/server-api.json',
    },
  },
})
