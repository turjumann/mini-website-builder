"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Trash2 } from "lucide-react"
import useBuilder from "@/hooks/use-builder"

const ResetButton = () => {
  const { resetElements } = useBuilder()
  const [popoverOpen, setPopoverOpen] = useState(false)

  const handleReset = () => {
    resetElements()
    setPopoverOpen(false)
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <Trash2 className="h-6 w-6" />
          Reset
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="text-center">
          <p className="mb-4">
            Are you sure you want to reset the elements? Make sure to save and
            backup your work!
          </p>
          <div className="flex justify-center gap-2">
            <Button variant="outline" onClick={() => setPopoverOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReset}>
              Yes, Reset
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default ResetButton
