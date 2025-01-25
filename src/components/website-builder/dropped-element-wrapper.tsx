import { Button } from "@/components/ui/button"
import {
  SectionElementInstance,
  SectionElements,
} from "@/components/website-builder/sections/section-elements"
import { toast } from "@/hooks/use-toast"
import useBuilder from "@/hooks/use-builder"
import { cn } from "@/lib/utils"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { Trash } from "lucide-react"

export default function DroppedElementWrapper({
  element,
}: {
  element: SectionElementInstance
}) {
  const { removeElement, selectedElement, setSelectedElement, pageConfig } =
    useBuilder()

  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDroppedElement: true,
    },
  })

  // const bottomHalf = useDroppable({
  //   id: element.id + "-bottom",
  //   data: {
  //     type: element.type,
  //     elementId: element.id,
  //     isBottomHalfDroppedElement: true,
  //   },
  // })

  const draggable = useDraggable({
    id: element.id + "drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDroppedElement: true,
    },
  })

  // hides the dragged item when dragged in the droppable area
  // if (draggable.isDragging) {
  //   return null
  // }

  const DroppedElement = SectionElements[element.type].droppedComponent
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.attributes}
      {...draggable.listeners}
      className={cn(
        "p-1 relative w-full h-full flex flex-col hover:cursor-pointer group",
        "hover:outline-dashed hover:outline-1 rounded",
        selectedElement === element &&
          "outline-dashed outline-1 outline-green-600"
      )}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedElement(element)
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className="absolute top-0 w-full h-1/2 rounded-t-md"
      />
      {/* <div
        ref={bottomHalf.setNodeRef}
        className="absolute bottom-0 w-full h-1/2 rounded-b-md"
      /> */}

      <div className="absolute top-0 z-50 h-full right-0 opacity-0 group-hover:opacity-100 transition-opacity ">
        <Button
          variant="outline"
          className="flex justify-center h-full w-7 border-none rounded rounded-l-none bg-red-500 hover:bg-red-600"
          onClick={(e) => {
            e.stopPropagation()
            removeElement(element.id)
            toast({
              title: "Deleted Successfully",
              description: `${
                SectionElements[element.type].draggableComponent.label
              } has been deleted!`,
            })
            setSelectedElement(null)
          }}
        >
          <Trash className="h-6 w-6 text-background" />
        </Button>
      </div>

      {topHalf.isOver && (
        <div className="absolute top-0 w-full h-[2px] bg-primary rounded-md" />
      )}
      {/* {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full h-[2px] bg-primary rounded-md" />
      )} */}
      <div
        className={cn(
          "flex h-full items-center rounded-md pointer-events-none opacity-100"
        )}
      >
        <DroppedElement elementInstance={element} pageConfig={pageConfig} />
      </div>
    </div>
  )
}
