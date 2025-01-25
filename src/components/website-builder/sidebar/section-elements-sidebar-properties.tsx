import { Button } from "@/components/ui/button"
import { SectionElements } from "@/components/website-builder/sections/SectionElements"
import useBuilder from "@/hooks/use-builder"
import { X } from "lucide-react"

const SectionElementsSidebarProperties = () => {
  const { selectedElement, setSelectedElement } = useBuilder()

  if (!selectedElement) return null

  const SectionProperties =
    SectionElements[selectedElement.type].propertiesComponent

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center ">
        <p className="text-md text-foreground/70 font-normal px-4">
          Section Properties
        </p>
        <Button
          size="icon"
          variant="ghost"
          className="mx-2"
          onClick={() => setSelectedElement(null)}
        >
          <X />
        </Button>
      </div>
      <div className="p-4">
        <SectionProperties elementInstance={selectedElement} />
      </div>
    </div>
  )
}

export default SectionElementsSidebarProperties
