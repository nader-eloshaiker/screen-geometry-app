import { type EnvTranslation, EnvTranslationContext } from './EnvTranslationContext'

export const EnvTranslationProvider = ({
  children,
  locale,
  setLocale,
  countriesList,
}: EnvTranslation & React.PropsWithChildren) => {
  return (
    <EnvTranslationContext.Provider value={{ locale, setLocale, countriesList }}>
      {children}
    </EnvTranslationContext.Provider>
  )
}
