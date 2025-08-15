import { type Config } from '@screengeometry/lib-api/spec'
import { createContext } from 'react'

export type EnvConfig = { config: Config | undefined }

export const EnvConfigContext = createContext<Config | undefined>(undefined)
