"use client"

import {
  ElementsType,
  SectionElements,
} from "@/components/website-builder/sections/SectionElements"
import SidebarDraggableElementOverlay from "@/components/website-builder/sidebar/sidebar-draggable-element-overlay"
import useBuilder from "@/hooks/use-builder"
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core"
import React, { useState } from "react"

const DragOverlayWrapper = () => {
  const [draggedItem, setDraggedItem] = useState<Active | null>(null)

  const { elements, pageConfig } = useBuilder()

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel: () => {
      setDraggedItem(null)
    },
    onDragEnd: () => {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) return null
  let node = <div>No overlay</div>

  const isSidebarDraggableBtnElement =
    draggedItem.data?.current?.isSidebarDraggableBtnElement

  if (isSidebarDraggableBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType
    node = (
      <SidebarDraggableElementOverlay sectionElement={SectionElements[type]} />
    )
  }

  const isDroppedElement = draggedItem.data?.current?.isDroppedElement

  if (isDroppedElement) {
    const elementId = draggedItem.data?.current?.elementId
    const element = elements.find((el) => el.id === elementId)

    if (!element) node = <div>No Element Found</div>
    else {
      const DroppedElementComponent =
        SectionElements[element.type].droppedComponent
      node = (
        <div className="rounded-xl bg-background/65 pointer-events-none">
          <DroppedElementComponent
            elementInstance={element}
            pageConfig={pageConfig}
          />
        </div>
      )
    }
  }

  return <DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper
