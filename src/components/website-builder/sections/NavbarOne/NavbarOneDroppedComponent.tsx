import { PageSize } from "@/components/context/builder-context"
import { CustomNavbarOneInstance } from "@/components/website-builder/sections/NavbarOne/NavbarOne"
import { SectionElementInstance } from "@/components/website-builder/sections/SectionElements"
import { cn } from "@/lib/utils"
import React from "react"

const NavbarOneDroppedComponent = ({
  elementInstance,
  pageConfig: { selectedSize },
}: {
  elementInstance: SectionElementInstance
  pageConfig: {
    selectedSize: PageSize
    pageSize: string
  }
}) => {
  const element = elementInstance as CustomNavbarOneInstance
  const {
    instanceProperties: { bgColor, textColor, logoText, navbarItems },
  } = element

  return (
    <div
      className="relative w-full"
      style={{ backgroundColor: bgColor ?? "", color: textColor ?? "" }}
    >
      <div className="flex justify-between items-center p-4 md:px-8">
        <div className="text-xl font-bold">{logoText}</div>

        {/* Hamburger only for mobile/tablet */}
        <div className={cn(selectedSize === "desktop" && "hidden")}>☰</div>

        {/* Desktop navigation */}
        <div
          className={cn(
            "flex space-x-4",
            selectedSize !== "desktop" && "hidden"
          )}
        >
          {navbarItems.map((item, index) => (
            <div key={index} className="underline">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NavbarOneDroppedComponent
