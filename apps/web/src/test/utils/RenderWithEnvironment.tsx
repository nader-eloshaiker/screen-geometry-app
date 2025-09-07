import { EnvConfig } from '@/app/hooks/config/EnvConfig'
import { QueryProvider } from '@/app/stores/query/QueryProvider'
import { EnvTranslationProvider } from '@/app/stores/translation/EnvTranslationProvider'
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
          <EnvConfig configReadyKey={'configReadyKey'}>
            <EnvTranslationProvider translationsReadyKey={'translationsReadyKey'}>{children}</EnvTranslationProvider>
          </EnvConfig>
        </PageLoaderProvider>
      </QueryProvider>
    ),
  })
