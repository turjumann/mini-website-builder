import { PageSize } from "@/components/context/builder-context"
import { NavbarOneSectionElement } from "@/components/website-builder/sections/NavbarOne/NavbarOne"

export type ElementsType = "NavBarOne"

export type SectionElementInstance = {
  id: string
  type: ElementsType
  /* eslint-disable @typescript-eslint/no-explicit-any */
  instanceProperties: Record<string, any>
}
export type SectionElement = {
  type: ElementsType

  instanceConstructor: (id: string) => SectionElementInstance

  draggableComponent: {
    icon: React.ReactNode
    label: string
  }
  droppedComponent: React.FC<{
    pageConfig: {
      selectedSize: PageSize
      pageSize: string
    }
    elementInstance: SectionElementInstance
  }>
  previewComponent: React.FC
  propertiesComponent: React.FC<{
    elementInstance: SectionElementInstance
  }>
}

type SectionElementsType = {
  [key in ElementsType]: SectionElement
}
export const SectionElements: SectionElementsType = {
  NavBarOne: NavbarOneSectionElement,
}
