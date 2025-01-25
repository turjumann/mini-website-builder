"use client"

import NavbarPropertiesComponent from "@/components/website-builder/sections/navbar/common/navbar-properties-compoment"
import {
  ElementsType,
  SectionElement,
} from "@/components/website-builder/sections/section-elements"
import { navbarInstanceProperties } from "@/components/website-builder/sections/navbar/common/constants"
import NavbarThreeDroppedComponent from "@/components/website-builder/sections/navbar/navbar-three/navbar-three-dropped-component"

const type: ElementsType = "NavbarThree"

export const NavbarThreeSectionElement: SectionElement = {
  type,
  instanceConstructor: (id: string) => ({
    id,
    type,
    instanceProperties: navbarInstanceProperties,
  }),
  draggableComponent: {
    icon: <p className="text-xl">N3</p>,
    label: "Navbar 3",
  },
  droppedComponent: NavbarThreeDroppedComponent,
  propertiesComponent: NavbarPropertiesComponent,
}
