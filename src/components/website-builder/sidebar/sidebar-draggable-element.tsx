"use client"

import { Button } from "@/components/ui/button"
import { SectionElement } from "@/components/website-builder/sections/section-elements"

import { useDraggable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"

const SidebarDraggableElement = ({
  sectionElement,
}: {
  sectionElement: SectionElement
}) => {
  const { icon, label } = sectionElement.draggableComponent

  const draggable = useDraggable({
    id: `draggable-btn-${sectionElement.type}`,
    data: {
      type: sectionElement.type,
      isSidebarDraggableBtnElement: true,
    },
  })

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn(
        "flex flex-col gap-2 h-20 w-20 cursor-grab",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      {icon}
      <p className="text-xs">{label}</p>
    </Button>
  )
}

export default SidebarDraggableElement
