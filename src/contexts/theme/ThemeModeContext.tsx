import { LightMode, TThemeMode } from '@components/Theme/ThemeConstants'
import { Dispatch, SetStateAction, createContext } from 'react'

export const ThemeModeContext = createContext<[TThemeMode, Dispatch<SetStateAction<TThemeMode>>]>([LightMode, () => {}])
