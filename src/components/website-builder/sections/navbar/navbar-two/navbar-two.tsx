"use client"

import NavbarPropertiesComponent from "@/components/website-builder/sections/navbar/common/navbar-properties-compoment"
import {
  ElementsType,
  SectionElement,
} from "@/components/website-builder/sections/section-elements"
import { navbarInstanceProperties } from "@/components/website-builder/sections/navbar/common/constants"
import NavbarTwoDroppedComponent from "@/components/website-builder/sections/navbar/navbar-two/navbar-two-dropped-component"

const type: ElementsType = "NavbarTwo"

export const NavbarTwoSectionElement: SectionElement = {
  type,
  instanceConstructor: (id: string) => ({
    id,
    type,
    instanceProperties: navbarInstanceProperties,
  }),
  draggableComponent: {
    icon: <p className="text-xl">N2</p>,
    label: "Navbar 2",
  },
  droppedComponent: NavbarTwoDroppedComponent,
  propertiesComponent: NavbarPropertiesComponent,
}
