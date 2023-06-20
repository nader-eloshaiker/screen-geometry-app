"use client" // This is a client component

import { useState } from "react"
import { DarkModeSwitch } from "./DarkModeSwitch"
import { useDarkSide } from "../hooks/useDarkSide"

export default function ThemeSwitcher() {
  const [colorTheme, setTheme] = useDarkSide()
  const [darkSide, setDarkSide] = useState<boolean>(
    colorTheme === "light" ? true : false
  )

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme)
    setDarkSide(checked)
  }

  return (
    <DarkModeSwitch
      style={{ marginBottom: "2rem" }}
      checked={darkSide}
      onChange={toggleDarkMode}
      size={30}
    />
  )
}