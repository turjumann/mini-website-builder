"use client"

import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import useBuilder from "@/hooks/use-builder"
import SectionElementsSidebarContent from "@/components/website-builder/sidebar/section-elements-sidebar-content"
import SectionElementsSidebarProperties from "@/components/website-builder/sidebar/section-elements-sidebar-properties"
import { SectionElements } from "@/components/website-builder/sections/SectionElements"

export function AppSidebar() {
  const { selectedElement } = useBuilder()

  return (
    <Sidebar>
      <SidebarHeader className="gap-0 flex flex-col justify-between h-16 p-0 mt-[1px]">
        <div className="flex h-full justify-start items-center">
          <p className="text-lg font-light p-4">
            {!selectedElement && "Draggable Sections"}
            {selectedElement &&
              "Selected: " +
                SectionElements[selectedElement.type].draggableComponent.label}
          </p>
        </div>
        <Separator />
      </SidebarHeader>
      <SidebarContent>
        {!selectedElement && <SectionElementsSidebarContent />}
        {selectedElement && <SectionElementsSidebarProperties />}
      </SidebarContent>
    </Sidebar>
  )
}
