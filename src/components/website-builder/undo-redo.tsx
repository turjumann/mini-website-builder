import { Button } from "@/components/ui/button"
import useBuilder from "@/hooks/use-builder"
import { Redo, Undo } from "lucide-react"
import React from "react"

const UndoRedo = () => {
  const { isUndoDisabled, isRedoDisabled, undo, redo } = useBuilder()
  return (
    <div className="flex items-center gap-2">
      <Button
        className="border border-border group"
        size="icon"
        disabled={isUndoDisabled}
        variant="ghost"
        onClick={undo}
      >
        <Undo className="text-primary group-disabled:text-inherit" />
      </Button>
      <Button
        onClick={redo}
        className="border border-border group"
        size="icon"
        disabled={isRedoDisabled}
        variant="ghost"
      >
        <Redo className="text-primary group-disabled:text-inherit" />
      </Button>
    </div>
  )
}

export default UndoRedo
