import { PageSize } from "@/components/context/builder-context"
import { FooterOneSectionElement } from "@/components/website-builder/sections/footer/footer-one/footer-one"
import { FooterTwoSectionElement } from "@/components/website-builder/sections/footer/footer-two/footer-two"
import { HeroOneSectionElement } from "@/components/website-builder/sections/hero/hero-one/hero-one"
import { HeroTwoSectionElement } from "@/components/website-builder/sections/hero/hero-two/hero-two"
import { NavbarOneSectionElement } from "@/components/website-builder/sections/navbar/navbar-one/navbar-one"
import { NavbarThreeSectionElement } from "@/components/website-builder/sections/navbar/navbar-three/navbar-three"
import { NavbarTwoSectionElement } from "@/components/website-builder/sections/navbar/navbar-two/navbar-two"

export type ElementsType =
  | "NavbarOne"
  | "NavbarTwo"
  | "NavbarThree"
  | "HeroOne"
  | "HeroTwo"
  | "FooterOne"
  | "FooterTwo"

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
  propertiesComponent: React.FC<{
    elementInstance: SectionElementInstance
  }>
}

type SectionElementsType = {
  [key in ElementsType]: SectionElement
}
export const SectionElements: SectionElementsType = {
  NavbarOne: NavbarOneSectionElement,
  NavbarTwo: NavbarTwoSectionElement,
  NavbarThree: NavbarThreeSectionElement,
  HeroOne: HeroOneSectionElement,
  HeroTwo: HeroTwoSectionElement,
  FooterOne: FooterOneSectionElement,
  FooterTwo: FooterTwoSectionElement,
}
