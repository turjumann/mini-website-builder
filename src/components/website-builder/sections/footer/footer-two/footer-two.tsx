"use client"

import { footerInstanceProperties } from "@/components/website-builder/sections/footer/common/constants"
import FooterPropertiesComponent from "@/components/website-builder/sections/footer/common/footer-properties-component"
import FooterTwoDroppedComponent from "@/components/website-builder/sections/footer/footer-two/footer-two-dropped-component"
import {
  ElementsType,
  SectionElement,
} from "@/components/website-builder/sections/section-elements"

const type: ElementsType = "FooterTwo"

export const FooterTwoSectionElement: SectionElement = {
  type,
  instanceConstructor: (id: string) => ({
    id,
    type,
    instanceProperties: footerInstanceProperties,
  }),
  draggableComponent: {
    icon: <p className="text-xl">F2</p>,
    label: "Footer 2",
  },
  droppedComponent: FooterTwoDroppedComponent,
  propertiesComponent: FooterPropertiesComponent,
}
