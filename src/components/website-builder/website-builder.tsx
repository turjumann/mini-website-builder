"use client"

import {
  DndContext,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import DragOverlayWrapper from "@/components/website-builder/drag-overlay-wrapper"
import WebsitePlayground from "@/components/website-builder/website-playground"
import { useId } from "react"

const WebsiteBuilder = () => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  })
  const sensors = useSensors(mouseSensor, touchSensor)

  const id = useId()

  return (
    <DndContext sensors={sensors} id={id} collisionDetection={pointerWithin}>
      <WebsitePlayground />
      <DragOverlayWrapper />
    </DndContext>
  )
}

export default WebsiteBuilder
