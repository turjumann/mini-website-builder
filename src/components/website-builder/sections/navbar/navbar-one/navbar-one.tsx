"use client"

import NavbarOneDroppedComponent from "@/components/website-builder/sections/navbar/navbar-one/navbar-one-dropped-component"
import NavbarPropertiesComponent from "@/components/website-builder/sections/navbar/common/navbar-properties-compoment"
import {
  ElementsType,
  SectionElement,
} from "@/components/website-builder/sections/section-elements"
import { navbarInstanceProperties } from "@/components/website-builder/sections/navbar/common/constants"

const type: ElementsType = "NavBarOne"

export const NavbarOneSectionElement: SectionElement = {
  type,
  instanceConstructor: (id: string) => ({
    id,
    type,
    instanceProperties: navbarInstanceProperties,
  }),
  draggableComponent: {
    icon: <p className="text-xl">N1</p>,
    label: "Navbar 1",
  },
  droppedComponent: NavbarOneDroppedComponent,
  propertiesComponent: NavbarPropertiesComponent,
}
