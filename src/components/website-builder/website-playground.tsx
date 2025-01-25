import { ThemeToggle } from "@/components/theme-toggle"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/website-builder/sidebar/app-sidebar"
import { cn } from "@/lib/utils"
import WebsiteBuilderNavbar from "@/components/website-builder/website-builder-navbar"
import React from "react"
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core"
import useBuilder from "@/hooks/use-builder"
import {
  ElementsType,
  SectionElements,
} from "@/components/website-builder/sections/section-elements"
import { idGenerator } from "@/lib/id-generator"
import DroppedElementWrapper from "@/components/website-builder/dropped-element-wrapper"

const WebsitePlayground = () => {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    pageConfig: { pageSize },
    removeElement,
  } = useBuilder()

  const droppable = useDroppable({
    id: "droppable-area",
    data: {
      isDroppableArea: true,
    },
  })

  useDndMonitor({
    // onDragMove: (e: DragMoveEvent) => {
    //   console.log("e", e)
    // },
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event
      if (!active || !over) return

      const activeId = active.data?.current?.elementId
      const overId = over.data?.current?.elementId
      const type = active.data?.current?.type
      const overElementIndex = elements.findIndex((el) => el.id === overId)
      const activeElementIndex = elements.findIndex((el) => el.id === activeId)

      const newElement = SectionElements[
        type as ElementsType
      ].instanceConstructor(idGenerator(type))

      const isSidebarDraggableBtnElement =
        active.data?.current?.isSidebarDraggableBtnElement

      const isDroppingOverDroppableArea = over.data?.current?.isDroppableArea

      const isOverTopHalfDroppedElement =
        over.data?.current?.isTopHalfDroppedElement
      const isOverBottomHalfDroppedElement =
        over.data?.current?.isBottomHalfDroppedElement
      const isOverDroppedElement =
        isOverTopHalfDroppedElement || isOverBottomHalfDroppedElement
      const isDroppingDraggableSidebarOverDroppedElements =
        isSidebarDraggableBtnElement && isOverDroppedElement

      const isDraggingDroppedElement = active.data?.current?.isDroppedElement

      const isDroppedDroppedElementOverDroppedElement =
        isDraggingDroppedElement && isOverDroppedElement

      const isDroppingSidebarBtnElementOverDroppableArea =
        isSidebarDraggableBtnElement && isDroppingOverDroppableArea
      const isDroppingDroppedElementOverDroppableArea =
        isDraggingDroppedElement && isDroppingOverDroppableArea

      // dropping draggable sidebar btn over main droppable area
      if (isDroppingSidebarBtnElementOverDroppableArea) {
        addElement(elements.length, newElement)
        return
      }

      // dropping draggable sidebar btns over already dropped elements
      if (isDroppingDraggableSidebarOverDroppedElements) {
        if (overElementIndex === -1) throw new Error("Element not found")

        let indexForNewElement = overElementIndex
        if (isOverBottomHalfDroppedElement) {
          indexForNewElement = overElementIndex + 1
        }

        addElement(indexForNewElement, newElement)
        return
      }

      //  dropping dropped elements over each other
      if (isDroppedDroppedElementOverDroppedElement) {
        if (activeElementIndex === -1 || overElementIndex === -1)
          throw new Error("element not found")
        const activeElement = { ...elements[activeElementIndex] }

        let indexForNewElement = overElementIndex

        if (activeElementIndex < overElementIndex)
          indexForNewElement = overElementIndex - 1

        removeElement(activeId)
        addElement(indexForNewElement, activeElement)
      }

      // dropping dropped elements over droppable area (dropping at the end of the array)
      if (isDroppingDroppedElementOverDroppableArea) {
        const lastElementIdx = elements.length
        const activeElement = { ...elements[activeElementIndex] }
        removeElement(activeId)
        addElement(lastElementIdx, activeElement)
      }
    },
  })

  return (
    <SidebarProvider
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setSelectedElement(null)
        }
      }}
    >
      {/* DRAGGABLE ITEMS FOR APPSIDEBAR */}
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between flex-1 gap-2 px-4">
            <div className="flex gap-2 items-center">
              <div className="hidden md:flex  gap-2 items-center">
                <SidebarTrigger className="w-4 h-4" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </div>
              <h2 className="text-xl font-light">Mini Website Builder</h2>
            </div>
            <ThemeToggle size="small" />
          </div>
        </header>
        <Separator />
        <div className="relative h-full">
          <WebsiteBuilderNavbar />
          <div
            onClick={() => {
              if (selectedElement) setSelectedElement(null)
            }}
            className={
              "absolute top-[52px] pb-4 inset-0 flex flex-1 px-4 justify-center"
            }
          >
            {/* MAIN DROPPABLE HERE */}
            <div
              ref={droppable.setNodeRef}
              className={cn(
                "flex items-center flex-1 flex-col bg-white dark:bg-card rounded-3xl overflow-y-auto p-4",
                "transition-maxWidth duration-200", // Transition only max width
                pageSize,
                droppable.isOver && "ring-1 ring-primary"
              )}
            >
              {!droppable.isOver && elements.length === 0 && (
                <div className="flex items-center justify-center flex-1 flex-col">
                  <p className="text-2xl font-extralight opacity-45">
                    Drop sections here to get started
                  </p>
                </div>
              )}
              {droppable.isOver && elements.length === 0 && (
                <div className="p-4 w-full">
                  <div className="h-[120px] rounded-md bg-primary/20" />
                </div>
              )}
              {elements.length > 0 && (
                <div className="flex flex-col w-full gap-0 p-0">
                  {elements.map((element) => (
                    <DroppedElementWrapper key={element.id} element={element} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default WebsitePlayground
