import { useContext } from 'react'
import { EnvSessionContext } from './EnvSessionContext'

export const useEnvSession = () => {
  const context = useContext(EnvSessionContext)
  if (context === undefined) throw new Error('useEnvConfig must be used within a EnvSessionProvider')

  return context
}
