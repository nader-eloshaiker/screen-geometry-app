import { useContext } from 'react'
import { EnvTranslateContext } from './EnvTranslateContext'

export const useEnvTranslate = () => {
  const context = useContext(EnvTranslateContext)
  if (context === undefined) throw new Error('useEnvTranslate must be used within a EnvTranslateProvider')

  return context
}
