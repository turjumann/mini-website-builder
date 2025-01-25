import { SectionElementInstance } from "@/components/website-builder/sections/SectionElements"
import useBuilder from "@/hooks/use-builder"
import { LOCAL_STORAGE_KEY } from "@/lib/constants"
import { useEffect } from "react"

export const useInitializeElements = () => {
  const { setElements } = useBuilder()
  useEffect(() => {
    const savedElements = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedElements) {
      try {
        const parsedElements: SectionElementInstance[] =
          JSON.parse(savedElements)
        setElements(parsedElements)
      } catch (error) {
        console.error("Error parsing saved elements:", error)
      }
    }
  }, [setElements])
}
