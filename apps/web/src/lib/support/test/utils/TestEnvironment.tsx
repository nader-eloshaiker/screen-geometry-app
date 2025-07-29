import { EnvConfigProvider } from '@/app/hooks/envConfig/EnvConfigProvider'
import { QueryProvider } from '@/app/hooks/query/QueryProvider'
import { serverAxiosInstance } from '@screengeometry/lib-api/apiClient'
import { getGetConfigResponseMock } from '@screengeometry/lib-api/spec'
import { TestTranslationsEnvironment } from './TestTranslationsEnvironment'

const config = getGetConfigResponseMock()
serverAxiosInstance.defaults.baseURL = config.SERVER_API_URL

export const TestEnvironment = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryProvider>
      <EnvConfigProvider config={config}>
        <TestTranslationsEnvironment>{children}</TestTranslationsEnvironment>
      </EnvConfigProvider>
    </QueryProvider>
  )
}
