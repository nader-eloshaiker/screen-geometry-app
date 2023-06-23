import { ThemeModeSwitch } from '../../Styled/ThemeModeSwitch';
import { DarkMode, LightMode } from './ThemeConstants';
import { useThemeMode } from './ThemeModeProvider';

type TProps = {
  title: string
}

export default function ThemeModeToggle({ title = 'Dark Mode' }: TProps) {
  const [themeState, setThemeState] = useThemeMode()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeState(event.target.checked ? DarkMode : LightMode)
  }

  return (
    <>
      <div>
        <label>{title}</label>
        <ThemeModeSwitch
          checked={themeState === DarkMode}
          onChange={handleChange}
          inputProps={{ 'aria-label': title }}
        />
      </div>
    </>
  )
}