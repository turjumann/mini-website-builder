"use client"

import { cn } from "@/lib/utils"
import { Eye } from "lucide-react"
import React, { useState } from "react"
import { PageSize } from "@/components/context/builder-context"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import ResponsiveContainerPreviewToggle from "@/components/website-builder/responsive-container-preview-toggle"
import { SectionElements } from "@/components/website-builder/sections/SectionElements"
import useBuilder from "@/hooks/use-builder"

const PreviewDialogButton = () => {
  const { elements } = useBuilder()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen)
  }

  const [pageConfig, setPageConfig] = useState<{
    selectedSize: PageSize
    pageSize: string
  }>({
    selectedSize: "desktop",
    pageSize: "max-w-full",
  })

  const handlePageSize = (size: PageSize) => {
    setPageConfig({
      selectedSize: size,
      pageSize:
        size === "desktop"
          ? "max-w-full"
          : size === "tablet"
          ? "max-w-3xl"
          : "max-w-sm",
    })
  }

  return (
    <Dialog open={isPreviewOpen} onOpenChange={togglePreview}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="gap-2">
          <Eye className="h-6 w-6" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full sm:rounded-none flex flex-col flex-grow p-0 gap-0 z-[101]">
        <div className="flex relative px-4 py-2 border-b gap-2">
          <p className="text-md font-light text-muted-foreground">
            Page Preview
          </p>
          <div className="md:absolute inset-0 flex justify-center items-center">
            <ResponsiveContainerPreviewToggle
              pageConfig={pageConfig}
              handlePageSize={handlePageSize}
            />
          </div>
        </div>

        {isPreviewOpen && (
          <div
            className={cn(
              "overflow-y-auto mx-auto w-full flex bg-white dark:bg-card flex-col justify-start p-0 h-full",
              "transition-maxWidth duration-200",
              pageConfig.pageSize
            )}
          >
            {elements.map((element) => {
              const ElementRender =
                SectionElements[element.type].droppedComponent
              return (
                <ElementRender
                  key={element.id}
                  elementInstance={element}
                  pageConfig={pageConfig}
                />
              )
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default PreviewDialogButton
