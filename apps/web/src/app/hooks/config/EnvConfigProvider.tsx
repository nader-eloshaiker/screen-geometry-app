import { EnvConfig, EnvConfigContext } from './EnvConfigContext'

export const EnvConfigProvider = ({ children, config }: EnvConfig & React.PropsWithChildren) => {
  return <EnvConfigContext.Provider value={config}>{children}</EnvConfigContext.Provider>
}
