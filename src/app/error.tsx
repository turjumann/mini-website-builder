"use client"

import { Button } from "@/components/ui/button"
import React, { useEffect } from "react"

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    console.error("error page", error)
  }, [error])

  return (
    <div className="w-full h-full flex flex-col flex-1 items-center justify-center gap-4 p-4">
      <span className="font-bold text-red-600">
        Error: <span>{error.message}</span>
      </span>

      <Button onClick={() => window.location.reload()}>Refresh Page</Button>
    </div>
  )
}

export default ErrorPage
