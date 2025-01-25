import { Button } from "@/components/ui/button"
import useBuilder from "@/hooks/use-builder"
import { Redo, Undo } from "lucide-react"
import React from "react"

const UndoRedo = () => {
  const { isUndoDisabled, isRedoDisabled, undo, redo } = useBuilder()
  return (
    <div className="flex items-center gap-2">
      <Button
        className="border border-border"
        size="icon"
        disabled={isUndoDisabled}
        variant="ghost"
        onClick={undo}
      >
        <Undo />
      </Button>
      <Button
        onClick={redo}
        className="border border-border"
        size="icon"
        disabled={isRedoDisabled}
        variant="ghost"
      >
        <Redo />
      </Button>
    </div>
  )
}

export default UndoRedo
