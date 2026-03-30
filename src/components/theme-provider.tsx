import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
)

function getStoredTheme(storageKey: string, fallbackTheme: Theme): Theme {
  if (typeof window === "undefined") return fallbackTheme

  const storage = window.localStorage
  if (typeof storage.getItem !== "function") return fallbackTheme

  const storedTheme = storage.getItem(storageKey)
  if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system")
    return storedTheme

  return fallbackTheme
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() =>
    getStoredTheme(storageKey, defaultTheme)
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (nextTheme: Theme) => {
      if (
        typeof window !== "undefined" &&
        typeof window.localStorage.setItem === "function"
      ) {
        window.localStorage.setItem(storageKey, nextTheme)
      }
      setTheme(nextTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}

function subscribeHtmlClass(onChange: () => void) {
  const el = document.documentElement
  const obs = new MutationObserver(onChange)
  obs.observe(el, { attributes: true, attributeFilter: ["class"] })
  return () => obs.disconnect()
}

function getDarkFromHtml(): boolean {
  return document.documentElement.classList.contains("dark")
}

/** Resolved appearance from `<html class="dark">`, including when theme is system. */
export function useResolvedDark(): boolean {
  return useSyncExternalStore(
    subscribeHtmlClass,
    getDarkFromHtml,
    () => false,
  )
}
