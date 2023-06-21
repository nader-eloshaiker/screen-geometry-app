"use client" // This is a client component

import { useState } from "react"
import { useDarkSide } from "../../hooks/useDarkSide"
import Switch from '@mui/material/Switch';

export default function ThemeSwitcher() {
  const [colorTheme, setTheme] = useDarkSide()
  const [darkSide, setDarkSide] = useState<boolean>(
    colorTheme === "light" ? true : false
  )

  const toggleDarkMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(colorTheme)
    setDarkSide(event.target.checked)
  }

  return (

    <Switch
      checked={darkSide}
      onChange={toggleDarkMode}
      inputProps={{ 'aria-label': 'Dark Mode' }}
    />
  )
}