"use client"

import NavbarOneDroppedComponent from "@/components/website-builder/sections/navbar-one/navbar-one-dropped-component"
import NavbarOnePropertiesComponent from "@/components/website-builder/sections/navbar-one/navbar-one-properties-compoment"
import {
  ElementsType,
  SectionElement,
  SectionElementInstance,
} from "@/components/website-builder/sections/section-elements"

const type: ElementsType = "NavBarOne"

export const navbarInstanceProperties = {
  logoText: "Logo",
  navbarItems: ["Home", "Shop", "About Us", "Contact Us"],
  bgColor: "",
  textColor: "",
}

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
  propertiesComponent: NavbarOnePropertiesComponent,
}

export type CustomNavbarOneInstance = SectionElementInstance & {
  instanceProperties: typeof navbarInstanceProperties
}
