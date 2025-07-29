import { EnvironmentConfig } from '@/app/hooks/envConfig/EnvironmentConfig'
import { EnvTranslations } from '@/app/hooks/envTranslate/EnvTranslations'
import { QueryProvider } from '@/app/hooks/query/QueryProvider'
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
          <EnvironmentConfig configReadyKey={'configReadyKey'}>
            <EnvTranslations translationsReadyKey={'translationsReadyKey'}>{children}</EnvTranslations>
          </EnvironmentConfig>
        </PageLoaderProvider>
      </QueryProvider>
    ),
  })
