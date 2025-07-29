import { useContext } from 'react'
import { EnvTranslationContext } from './EnvTranslationContext'

export const useEnvTranslate = () => {
  const context = useContext(EnvTranslationContext)
  if (context === undefined) throw new Error('useEnvTranslate must be used within a EnvTranslateProvider')

  return context
}
