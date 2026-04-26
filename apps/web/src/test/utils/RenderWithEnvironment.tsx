import { EnvConfigProvider } from '@/app/stores/config/EnvConfigProvider'
import { QueryProvider } from '@/app/stores/query/QueryProvider'
import { TranslationEnvProvider } from '@/app/stores/translation'
import { PageLoaderProvider } from '@screengeometry/lib-ui/pageloader'
import { render, type RenderOptions, type RenderResult } from '@testing-library/react'
import type { UserEvent } from '@testing-library/user-event'
import type { ReactElement } from 'react'

export type InteractComponent = RenderResult & { user: UserEvent }

export const renderWithEnvironment = async (jsx: ReactElement, options?: RenderOptions) =>
  render(jsx, {
    ...options,
    wrapper: ({ children }) => (
      <QueryProvider>
        <PageLoaderProvider initialLoadingKeys={['configReadyKey', 'translationsReadyKey']}>
          <EnvConfigProvider configReadyKey={'configReadyKey'}>
            <TranslationEnvProvider translationsReadyKey={'translationsReadyKey'}>{children}</TranslationEnvProvider>
          </EnvConfigProvider>
        </PageLoaderProvider>
      </QueryProvider>
    ),
  })
