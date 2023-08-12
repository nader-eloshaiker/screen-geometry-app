import { createContext, Dispatch, SetStateAction } from 'react'
import { LightMode, TThemeMode } from '../ThemeConstants'

export const ThemeModeContext = createContext<[TThemeMode, Dispatch<SetStateAction<TThemeMode>>]>([LightMode, () => {}])
