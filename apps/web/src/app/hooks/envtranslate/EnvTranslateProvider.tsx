import { EnvTranslate, EnvTranslateContext } from './EnvTranslateContext'

export const EnvConfigProvider = ({ children, locale, setLocale }: EnvTranslate & React.PropsWithChildren) => {
  return <EnvTranslateContext.Provider value={{ locale, setLocale }}>{children}</EnvTranslateContext.Provider>
}
