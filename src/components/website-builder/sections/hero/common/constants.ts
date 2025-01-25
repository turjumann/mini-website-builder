import { SectionElementInstance } from "@/components/website-builder/sections/section-elements"

export const heroInstanceProperties = {
  title: "Empower Your Digital Journey",
  body: "Transform your online presence with our cutting-edge solutions. We help businesses thrive in the digital landscape.",
  primaryBtnText: "Get Started",
  primaryBtnLink: "",
  secondaryBtnText: "Learn More",
  secondaryBtnLink: "",
  imageLink: "",
}
export type CustomHeroInstance = SectionElementInstance & {
  instanceProperties: typeof heroInstanceProperties
}
