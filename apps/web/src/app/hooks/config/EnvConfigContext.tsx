import { type Config } from '@screengeometry/lib-api/spec'
import { createContext } from 'react'

export type EnvConfig = Config | undefined

export const EnvConfigContext = createContext<EnvConfig | undefined>(undefined)
