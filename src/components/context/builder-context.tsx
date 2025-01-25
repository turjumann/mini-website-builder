"use client"

import {
  SectionElementInstance,
  SectionElements,
} from "@/components/website-builder/sections/section-elements"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react"
import { useToast } from "@/hooks/use-toast"
import { deepEqual } from "@/lib/utils"
import { LOCAL_STORAGE_KEY } from "@/lib/constants"

type BuilderContextType = {
  elements: SectionElementInstance[]
  setElements: Dispatch<SetStateAction<SectionElementInstance[]>>
  addElement: (idx: number, element: SectionElementInstance) => void
  removeElement: (id: string) => SectionElementInstance | null
  handlePageSize: (size: PageSize) => void
  selectedElement: SectionElementInstance | null
  setSelectedElement: Dispatch<SetStateAction<SectionElementInstance | null>>
  pageConfig: {
    selectedSize: PageSize
    pageSize: string
  }
  updateElement: (
    id: string,
    element: SectionElementInstance
  ) => SectionElementInstance
  saveElements: () => void
  loadElements: () => void
  resetElements: () => void
  undo: () => void
  redo: () => void
  pointer: number
  isUndoDisabled: boolean
  isRedoDisabled: boolean
}

export type PageSize = "desktop" | "tablet" | "mobile"
export type Size = "desktop" | "tablet" | "mobile"

export const BuilderContext = createContext<BuilderContextType | null>(null)

export default function BuilderContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const { toast } = useToast()

  // const [elements, setElements] = useState<SectionElementInstance[]>([])

  const [elements, setElements] = useState<SectionElementInstance[]>(() => {
    const savedElements = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedElements) {
      try {
        return JSON.parse(savedElements)
      } catch (error) {
        console.error("Error parsing saved elements:", error)
        return []
      }
    }
    return []
  })

  const [historyStack, setHistoryStack] = useState<SectionElementInstance[][]>([
    [],
  ]) // Full state snapshots
  const [pointer, setPointer] = useState<number>(0) // Tracks current position in history
  const [selectedElement, setSelectedElement] =
    useState<SectionElementInstance | null>(null)
  const [pageConfig, setPageConfig] = useState<{
    selectedSize: PageSize
    pageSize: string
  }>({
    selectedSize: "desktop",
    pageSize: "max-w-full",
  })

  const updateHistory = (newElements: SectionElementInstance[]) => {
    /**
     * it slices everything after the history is updated
     * for ex: H: [snapshot1, snapshot2, snapshot3, snapshot4]
     * -pointer is pointing at snapshot4 at idx 3
     * -user clicks undo, so now pointer pointing at idx 2
     * -user then does a new action, we need to remove everying after his current pointer
     * and define a new snapshot in order to not have conflicts if user tries to redo after a new action.
     */
    const newHistory = historyStack.slice(0, pointer + 1)

    newHistory.push(newElements)
    setHistoryStack(newHistory)
    setPointer(newHistory.length - 1)
  }

  const handlePageSize = (size: PageSize) => {
    setPageConfig({
      selectedSize: size,
      pageSize:
        size === "desktop"
          ? "max-w-full"
          : size === "tablet"
          ? "max-w-3xl"
          : "max-w-sm",
    })
  }

  const addElement = (idx: number, element: SectionElementInstance) => {
    setElements((prev) => {
      const newElements = [...prev]
      newElements.splice(idx, 0, element)
      updateHistory(newElements)
      return newElements
    })
  }

  const removeElement = (id: string) => {
    const element = elements.find((el) => el.id === id)

    setElements((prev) => {
      const newElements = prev.filter((el) => el.id !== id)
      updateHistory(newElements)
      return newElements
    })

    return element || null
  }

  const updateElement = (id: string, element: SectionElementInstance) => {
    const currElement = elements.find((el) => el.id === id)

    if (deepEqual(currElement, element)) {
      return currElement as SectionElementInstance
    }

    setElements((prev) => {
      const newElements = [...prev]
      const idx = newElements.findIndex((el) => el.id === id)
      newElements[idx] = element
      updateHistory(newElements)
      return newElements
    })

    toast({
      title: "Updated Successfully",
      description: `${
        SectionElements[element.type].draggableComponent.label
      } has been updated!`,
    })

    return element
  }

  const undo = () => {
    if (pointer > 0) {
      setPointer((prev) => prev - 1)
      setElements(historyStack[pointer - 1])
      if (selectedElement) setSelectedElement(null)
    }
  }

  const redo = () => {
    if (pointer < historyStack.length - 1) {
      setPointer((prev) => prev + 1)
      setElements(historyStack[pointer + 1])
      if (selectedElement) setSelectedElement(null)
    }
  }

  const saveElements = () => {
    // Save to localStorage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(elements))

    // Create export file
    const blob = new Blob([JSON.stringify(elements, null, 2)], {
      type: "application/json",
    })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "website-page-export.json"
    link.click()
    URL.revokeObjectURL(link.href)

    toast({
      title: "Saved Successfully",
      description: `Your work has been saved to your local storage & exported successfully!`,
    })
  }

  const loadElements = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string
            const parsedElements: SectionElementInstance[] = JSON.parse(content)

            // Update both localStorage and current state
            localStorage.setItem(LOCAL_STORAGE_KEY, content)
            setElements(parsedElements)
            updateHistory(parsedElements)

            toast({
              title: "Imported Successfully",
              description: `Your work has been imported successfully!`,
            })
          } catch (error) {
            console.error("Error parsing elements:", error)
            alert("Invalid file format")
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const resetHistoryStack = () => {
    setHistoryStack([[]])
    setPointer(0)
  }
  const resetElements = () => {
    setElements([])
    resetHistoryStack()
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]))

    toast({
      title: "Reset Successfully",
      description: `Your page has been reset successfully!`,
    })
  }

  const { isUndoDisabled, isRedoDisabled } = useMemo(
    () => ({
      isUndoDisabled: pointer === 0,
      isRedoDisabled: pointer === historyStack.length - 1,
    }),
    [pointer, historyStack.length]
  )

  return (
    <BuilderContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        pageConfig,
        handlePageSize,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
        saveElements,
        loadElements,
        resetElements,
        pointer,
        undo,
        redo,
        isUndoDisabled,
        isRedoDisabled,
      }}
    >
      {children}
    </BuilderContext.Provider>
  )
}
