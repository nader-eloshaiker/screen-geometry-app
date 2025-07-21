import { Config } from '@screengeometry/lib-api/spec'
import { createContext } from 'react'

export type EnvConfig = { config: Config }
export const DefaultEnvConfig: EnvConfig = {
  config: {
    ENV_TYPE: '',
    SERVER_API_URL: '',
    GA_TRACKING_ID: '',
  },
}

export const EnvConfigContext = createContext<Config>(DefaultEnvConfig.config)
