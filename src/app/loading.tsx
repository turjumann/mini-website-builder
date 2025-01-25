import { LoaderCircle } from "lucide-react"
import React from "react"

const LoadingPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoaderCircle className="animate-spin" />
    </div>
  )
}

export default LoadingPage
