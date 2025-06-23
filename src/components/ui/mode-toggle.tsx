import { useTheme } from "../theme/theme-provider"
import { Switch } from "./switch"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const isDark = theme === "dark"

  const handleThemeChange = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch id="theme-switch" checked={isDark} onCheckedChange={handleThemeChange} />
    </div>
  )
}
