import { useContext } from 'react'
import { EnvTranslationContext } from './TranslationEnvContext'

export const useTranslationEnv = () => {
  const context = useContext(EnvTranslationContext)
  if (context === undefined) throw new Error('useEnvTranslate must be used within a EnvTranslateProvider')

  return context
}
