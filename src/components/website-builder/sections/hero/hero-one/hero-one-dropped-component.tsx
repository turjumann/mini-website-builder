import { PageSize } from "@/components/context/builder-context"
import { CustomHeroInstance } from "@/components/website-builder/sections/hero/common/constants"
import { SectionElementInstance } from "@/components/website-builder/sections/section-elements"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const HeroOneDroppedComponent = ({
  elementInstance,
  pageConfig: { selectedSize },
}: {
  elementInstance: SectionElementInstance
  pageConfig: {
    selectedSize: PageSize
    pageSize: string
  }
}) => {
  const element = elementInstance as CustomHeroInstance

  const {
    title,
    body,
    primaryBtnText,
    secondaryBtnText,
    imageLink,
    primaryBtnLink,
    secondaryBtnLink,
  } = element.instanceProperties

  return (
    <section className="py-20">
      <div
        className={cn(
          "px-4",
          selectedSize === "desktop" && "px-8",
          selectedSize !== "desktop" && "px-6"
        )}
      >
        <div
          className={cn(
            "grid items-center gap-12 grid-cols-2",
            selectedSize !== "desktop" && "grid-cols-1"
          )}
        >
          <div>
            <h1
              className={cn(
                "text-4xl font-bold tracking-tight ",
                selectedSize === "mobile" && "text-4xl",
                selectedSize === "tablet" && "text-5xl"
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                "mt-4 text-xl text-gray-500",
                selectedSize !== "desktop" && "text-md"
              )}
            >
              {body}
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                target="_blank"
                href={primaryBtnLink || "#"}
                className={cn(
                  "rounded-lg bg-primary flex justify-center items-center p-2 px-4 text-white font-semibold",
                  selectedSize === "mobile" && "text-sm"
                )}
              >
                {primaryBtnText}
              </Link>
              <Link
                target="_blank"
                href={secondaryBtnLink || "#"}
                className={cn(
                  "rounded-lg flex justify-center items-center p-2 px-4 text-foreground dark:text-white border border-border font-semibold",
                  selectedSize === "mobile" && "text-sm"
                )}
              >
                {secondaryBtnText}
              </Link>
            </div>
          </div>
          <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:h-96">
            <Image
              src={imageLink || "/images/placeholder.svg"}
              alt="Main Image"
              className="h-full w-full object-cover object-center"
              width={800}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroOneDroppedComponent
