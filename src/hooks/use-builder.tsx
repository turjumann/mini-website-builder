"use client"

import { BuilderContext } from "@/components/context/builder-context"
import { useContext } from "react"

const useBuilder = () => {
  const context = useContext(BuilderContext)

  if (!context) {
    throw new Error("useBuilder must be used within BuilderContext")
  }
  return context
}

export default useBuilder
