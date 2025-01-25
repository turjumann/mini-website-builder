import { SectionElementInstance } from "@/components/website-builder/sections/section-elements"

export const navbarInstanceProperties = {
  logoText: "Logo",
  navbarItems: ["Home", "Shop", "About Us", "Contact Us"],
  bgColor: "",
  textColor: "",
}
export type CustomNavbarInstance = SectionElementInstance & {
  instanceProperties: typeof navbarInstanceProperties
}
