import { LightMode, TThemeMode } from '@local/components/theme/ThemeConstants'
import { Dispatch, SetStateAction, createContext } from 'react'

export const ThemeModeContext = createContext<[TThemeMode, Dispatch<SetStateAction<TThemeMode>>]>([LightMode, () => {}])
