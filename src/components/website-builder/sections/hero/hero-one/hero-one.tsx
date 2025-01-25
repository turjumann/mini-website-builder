"use client"

import {
  ElementsType,
  SectionElement,
} from "@/components/website-builder/sections/section-elements"
import HeroOneDroppedComponent from "@/components/website-builder/sections/hero/hero-one/hero-one-dropped-component"
import HeroPropertiesComponent from "@/components/website-builder/sections/hero/common/hero-properties-component"
import { heroInstanceProperties } from "@/components/website-builder/sections/hero/common/constants"

const type: ElementsType = "HeroOne"

export const HeroOneSectionElement: SectionElement = {
  type,
  instanceConstructor: (id: string) => ({
    id,
    type,
    instanceProperties: heroInstanceProperties,
  }),
  draggableComponent: {
    icon: <p className="text-xl">H1</p>,
    label: "Hero 1",
  },
  droppedComponent: HeroOneDroppedComponent,
  propertiesComponent: HeroPropertiesComponent,
}
