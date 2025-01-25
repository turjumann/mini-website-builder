"use client"

import { footerInstanceProperties } from "@/components/website-builder/sections/footer/common/constants"
import FooterPropertiesComponent from "@/components/website-builder/sections/footer/common/footer-properties-component"
import FooterOneDroppedComponent from "@/components/website-builder/sections/footer/footer-one/footer-one-dropped-component"
import {
  ElementsType,
  SectionElement,
} from "@/components/website-builder/sections/section-elements"

const type: ElementsType = "FooterOne"

export const FooterOneSectionElement: SectionElement = {
  type,
  instanceConstructor: (id: string) => ({
    id,
    type,
    instanceProperties: footerInstanceProperties,
  }),
  draggableComponent: {
    icon: <p className="text-xl">F1</p>,
    label: "Footer 1",
  },
  droppedComponent: FooterOneDroppedComponent,
  propertiesComponent: FooterPropertiesComponent,
}
