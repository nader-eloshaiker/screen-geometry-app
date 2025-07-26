import { EnvironmentConfig } from '@/app/components/envconfig/EnvironmentConfig'
import { TranslationsEnvironment } from '@/app/components/envtranslations/EnvironmentTranslations'
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
            <TranslationsEnvironment translationsReadyKey={'translationsReadyKey'}>{children}</TranslationsEnvironment>
          </EnvironmentConfig>
        </PageLoaderProvider>
      </QueryProvider>
    ),
  })
