import { EnvSession, EnvSessionContext } from './EnvSessionContext'

export const EnvSessionProvider = ({ children, session }: EnvSession & TReactChildren) => {
  return <EnvSessionContext.Provider value={session}>{children}</EnvSessionContext.Provider>
}
