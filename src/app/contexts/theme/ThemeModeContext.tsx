import { LightMode, TThemeMode } from '@app/components/theme/ThemeManager'
import { Dispatch, SetStateAction, createContext } from 'react'

export const ThemeModeContext = createContext<[TThemeMode, Dispatch<SetStateAction<TThemeMode>>]>([LightMode, () => {}])
