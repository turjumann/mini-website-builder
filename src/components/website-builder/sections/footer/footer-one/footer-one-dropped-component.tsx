import { PageSize } from "@/components/context/builder-context"
import { CustomFooterInstance } from "@/components/website-builder/sections/footer/common/constants"
import { SectionElementInstance } from "@/components/website-builder/sections/section-elements"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"
import { FaFacebookSquare } from "react-icons/fa"
import { FaInstagramSquare } from "react-icons/fa"
import { FaTwitterSquare } from "react-icons/fa"
import { FaLinkedin } from "react-icons/fa"

const FooterOneDroppedComponent = ({
  elementInstance,
  pageConfig: { selectedSize },
}: {
  elementInstance: SectionElementInstance
  pageConfig: {
    selectedSize: PageSize
    pageSize: string
  }
}) => {
  const element = elementInstance as CustomFooterInstance
  const {
    instanceProperties: {
      title,
      description,
      footerBottom,
      xLink,
      fbLink,
      insLink,
      lnLink,
      cols,
    },
  } = element

  return (
    <footer className="bg-gray-900 text-gray-300 rounded-b-lg w-full">
      <div className="container mx-auto px-6 py-12">
        <div
          className={cn(
            "grid gap-8",
            selectedSize === "desktop" && "grid-cols-4",
            selectedSize === "tablet" && "grid-cols-3",
            selectedSize === "mobile" && "grid-cols-2"
          )}
        >
          {/* About Us Section */}
          <div>
            <h2 className="mb-6 text-2xl font-bold text-white">{title}</h2>
            <p className="mb-4">{description}</p>
            <div className="flex space-x-4">
              <Link target="_blank" href={fbLink} className="hover:text-white">
                <FaFacebookSquare size={20} />
              </Link>
              <Link target="_blank" href={xLink} className="hover:text-white">
                <FaTwitterSquare size={20} />
              </Link>
              <Link target="_blank" href={insLink} className="hover:text-white">
                <FaInstagramSquare size={20} />
              </Link>
              <Link target="_blank" href={lnLink} className="hover:text-white">
                <FaLinkedin size={20} />
              </Link>
            </div>
          </div>
          {/* Dynamic Columns */}
          {cols.map((col, colIndex) => (
            <div key={colIndex}>
              <h2 className="mb-6 text-2xl font-bold text-white">
                {col.title}
              </h2>
              <ul className="space-y-2">
                {col.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      target="_blank"
                      href={link.link}
                      className="hover:text-white"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-sm">{footerBottom}</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterOneDroppedComponent
