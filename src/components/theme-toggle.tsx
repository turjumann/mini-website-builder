"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Monitor } from "lucide-react"

type ThemeToggleProps = {
  size?: "small" | "medium"
}

export function ThemeToggle({ size = "small" }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const sizes = {
    mainGap: size === "small" ? "" : size === "medium" && "gap-1",
    mainPadding: size === "small" ? "p-0.5" : size === "medium" && "p-1",
    buttonPadding: size === "small" ? "p-1.5" : size === "medium" && "p-1.5",
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const themeOptions = [
    { key: "light", icon: Sun },
    { key: "system", icon: Monitor },
    { key: "dark", icon: Moon },
  ]

  return (
    <div
      className={`inline-flex items-center bg-background ${sizes.mainGap} rounded-full ${sizes.mainPadding} border border-border`}
    >
      {themeOptions.map(({ key, icon: Icon }) => (
        <button
          key={key}
          className={`${
            sizes.buttonPadding
          } rounded-full transition-colors duration-200 ${
            mounted && theme === key
              ? "bg-input text-accent-foreground"
              : "hover:bg-input/65"
          }`}
          onClick={() => mounted && setTheme(key)}
          aria-label={`Set ${key} theme`}
          disabled={!mounted}
        >
          <Icon
            strokeWidth={1.5}
            className={`w-4 h-4 ${!mounted && "text-accent-foreground"}`}
          />
        </button>
      ))}
    </div>
  )
}
