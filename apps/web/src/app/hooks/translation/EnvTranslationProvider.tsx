import { type EnvTranslation, EnvTranslationContext } from './EnvTranslationContext'

export const EnvTranslationProvider = ({ children, locale, setLocale }: EnvTranslation & React.PropsWithChildren) => {
  return <EnvTranslationContext.Provider value={{ locale, setLocale }}>{children}</EnvTranslationContext.Provider>
}
