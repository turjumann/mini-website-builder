"use client"

import { Button } from "@/components/ui/button"
import useBuilder from "@/hooks/use-builder"
import { Import, SaveAll } from "lucide-react"
import React from "react"

const ImportExportButton = () => {
  const { saveElements, loadElements } = useBuilder()

  return (
    <div className="flex items-center gap-2">
      <Button onClick={saveElements} variant={"outline"} className="gap-2">
        <SaveAll className="h-6 w-6" />
        Save
      </Button>
      <Button onClick={loadElements} variant={"outline"} className="gap-2">
        <Import className="h-6 w-6" />
        Import
      </Button>
    </div>
  )
}

export default ImportExportButton
