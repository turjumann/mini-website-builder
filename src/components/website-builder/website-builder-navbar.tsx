import PreviewDialogButton from "@/components/website-builder/preview-dialog-btn"
import { ResponsiveContainerToggle } from "@/components/website-builder/responsive-container-toggle"
import ImportExportButton from "@/components/website-builder/import-export-btn"
import React from "react"
import ResetButton from "@/components/website-builder/reset-button"
import UndoRedo from "@/components/website-builder/undo-redo"

const WebsiteBuilderNavbar = () => {
  return (
    <div className="py-2 px-4 flex justify-between items-center select-none">
      <div className="flex gap-2 items-center">
        <UndoRedo />
        <ResetButton />
      </div>
      <ResponsiveContainerToggle />
      {/* <p>Save/Load</p> */}
      <div className="flex gap-2 items-center">
        <PreviewDialogButton />
        <ImportExportButton />
      </div>
    </div>
  )
}

export default WebsiteBuilderNavbar
