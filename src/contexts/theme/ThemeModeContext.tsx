import { createContext, Dispatch, SetStateAction } from 'react'
import { LightMode, TThemeMode } from '../../components/theme/ThemeConstants'

export const ThemeModeContext = createContext<[TThemeMode, Dispatch<SetStateAction<TThemeMode>>]>([LightMode, () => {}])
