import { Button } from "@/components/ui/button"
import { SectionElement } from "@/components/website-builder/sections/section-elements"
import React from "react"

const SidebarDraggableElementOverlay = ({
  sectionElement,
}: {
  sectionElement: SectionElement
}) => {
  const { icon, label } = sectionElement.draggableComponent

  return (
    <Button
      variant="outline"
      className="flex flex-col gap-2 h-20 w-20 cursor-grab"
    >
      {icon}
      <p className="text-xs">{label}</p>
    </Button>
  )
}

export default SidebarDraggableElementOverlay
