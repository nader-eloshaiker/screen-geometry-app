import { EnvConfig } from '@/app/hooks/config/EnvConfig'
import { QueryProvider } from '@/app/hooks/query/QueryProvider'
import { EnvTranslation } from '@/app/hooks/translation/EnvTranslation'
import { PageLoaderProvider } from '@screengeometry/lib-ui/hooks/pageloader'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event'
import { ReactElement } from 'react'

export type InteractComponent = RenderResult & { user: UserEvent }

export const renderWithEnvironment = async (jsx: ReactElement, options?: RenderOptions) =>
  render(jsx, {
    ...options,
    wrapper: ({ children }) => (
      <QueryProvider>
        <PageLoaderProvider initialLoadingKeys={['configReadyKey', 'translationsReadyKey']}>
          <EnvConfig configReadyKey={'configReadyKey'}>
            <EnvTranslation translationsReadyKey={'translationsReadyKey'}>{children}</EnvTranslation>
          </EnvConfig>
        </PageLoaderProvider>
      </QueryProvider>
    ),
  })
