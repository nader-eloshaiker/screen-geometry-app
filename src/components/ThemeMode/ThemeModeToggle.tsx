import { DarkMode, LightMode } from './ThemeConstants'
import { useThemeMode } from './useThemeMode'

type TProps = {
  title: string
}

export default function ThemeModeToggle({ title = 'Dark Mode' }: TProps) {
  const [themeState, setThemeState] = useThemeMode()

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeState(event.target.checked ? DarkMode : LightMode)
  }

  return (
    <div className='form-control'>
      <label className='cursor-pointer label'>
        <span className='label-text'>{title}</span>
        <input
          type='checkbox'
          className='toggle-accent toggle'
          onChange={handleChange}
          checked={themeState === DarkMode}
        />
      </label>
    </div>
  )
}
