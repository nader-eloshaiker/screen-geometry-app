import { useContext } from 'react'
import { EnvCountryContext } from './EnvCountryContext'

export const useEnvCountry = () => {
  const context = useContext(EnvCountryContext)
  if (context === undefined) throw new Error('useEnvCountry must be used within a EnvCountryProvider')

  return context
}
