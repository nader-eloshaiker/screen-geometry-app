import { type EnvSession, EnvSessionContext } from './EnvSessionContext'

export const EnvSessionProvider = ({ children, session }: EnvSession & React.PropsWithChildren) => {
  return <EnvSessionContext.Provider value={session}>{children}</EnvSessionContext.Provider>
}
