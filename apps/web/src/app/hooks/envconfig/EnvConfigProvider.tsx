import { EnvConfig, EnvConfigContext } from './EnvConfigContext'

export const EnvConfigProvider = ({ children, config }: EnvConfig & TReactChildren) => {
  return <EnvConfigContext.Provider value={config}>{children}</EnvConfigContext.Provider>
}
