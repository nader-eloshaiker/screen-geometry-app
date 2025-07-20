import { LightMode, TThemeMode } from '@/app/hooks/theme/Theme.types'
import { Dispatch, SetStateAction, createContext } from 'react'

export const ThemeContext = createContext<Readonly<[TThemeMode, Dispatch<SetStateAction<TThemeMode>>]>>([
  LightMode,
  () => {},
])
