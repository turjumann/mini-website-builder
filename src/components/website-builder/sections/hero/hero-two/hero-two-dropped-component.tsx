import { PageSize } from "@/components/context/builder-context"
import { CustomHeroInstance } from "@/components/website-builder/sections/hero/common/constants"
import { SectionElementInstance } from "@/components/website-builder/sections/section-elements"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const HeroTwoDroppedComponent = ({
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
          {" "}
          <div className="flex flex-col justify-center lg:order-2">
            <h1
              className={cn(
                "text-4xl font-bold tracking-tight text-primary",
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
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                target="_blank"
                href={primaryBtnLink || "#"}
                className={cn(
                  "group inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white transition-all duration-200 ease-in-out hover:bg-blue-700",
                  selectedSize === "mobile" && "text-sm"
                )}
              >
                {primaryBtnText}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
              </Link>
              <Link
                target="_blank"
                href={secondaryBtnLink || "#"}
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-gray-200 px-6 py-3 text-base font-semibold text-gray-900 transition-all duration-200 ease-in-out hover:bg-gray-300",
                  selectedSize === "mobile" && "text-sm"
                )}
              >
                {secondaryBtnText}
              </Link>
            </div>
          </div>
          <div className="relative lg:order-1">
            <div className="relative overflow-hidden rounded-lg shadow-lg ">
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
      </div>
    </section>
  )
}

export default HeroTwoDroppedComponent
