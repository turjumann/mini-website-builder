"use client"

import {
  ElementsType,
  SectionElement,
} from "@/components/website-builder/sections/section-elements"
import HeroPropertiesComponent from "@/components/website-builder/sections/hero/common/hero-properties-component"
import { heroInstanceProperties } from "@/components/website-builder/sections/hero/common/constants"
import HeroTwoDroppedComponent from "@/components/website-builder/sections/hero/hero-two/hero-two-dropped-component"

const type: ElementsType = "HeroTwo"

export const HeroTwoSectionElement: SectionElement = {
  type,
  instanceConstructor: (id: string) => ({
    id,
    type,
    instanceProperties: heroInstanceProperties,
  }),
  draggableComponent: {
    icon: <p className="text-xl">H2</p>,
    label: "Hero 2",
  },
  droppedComponent: HeroTwoDroppedComponent,
  propertiesComponent: HeroPropertiesComponent,
}
