import { useContext } from 'react'
import { EnvConfigContext } from './EnvConfigContext'

export const useEnvConfig = () => {
  const context = useContext(EnvConfigContext)
  if (context === undefined) throw new Error('useEnvConfig must be used within a EnvConfigProvider')

  return context
}
