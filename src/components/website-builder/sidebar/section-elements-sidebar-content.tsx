import React from "react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import SidebarDraggableElement from "@/components/website-builder/sidebar/sidebar-draggable-element"
import { SectionElements } from "@/components/website-builder/sections/section-elements"

const SectionElementsSidebarContent = () => {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="font-bold text-sm">
          Navigation Bars
        </SidebarGroupLabel>
        <SidebarGroupContent className="p-2 grid grid-cols-2 gap-4 w-fit">
          <SidebarDraggableElement sectionElement={SectionElements.NavbarOne} />
          <SidebarDraggableElement sectionElement={SectionElements.NavbarTwo} />
          <SidebarDraggableElement
            sectionElement={SectionElements.NavbarThree}
          />
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel className="font-bold text-sm">
          Hero Sections
        </SidebarGroupLabel>
        <SidebarGroupContent className="p-2 grid grid-cols-2 gap-4 w-fit">
          Content 2
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel className="font-bold text-sm">
          Body Sections
        </SidebarGroupLabel>
        <SidebarGroupContent className="p-2 grid grid-cols-2 gap-4 w-fit">
          content 3
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel className="font-bold text-sm">
          Footer Sections
        </SidebarGroupLabel>
        <SidebarGroupContent className="p-2 grid grid-cols-2 gap-4 w-fit">
          content 4
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}

export default SectionElementsSidebarContent
