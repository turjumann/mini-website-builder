import { PageSize } from "@/components/context/builder-context"
import { CustomFooterInstance } from "@/components/website-builder/sections/footer/common/constants"
import { SectionElementInstance } from "@/components/website-builder/sections/section-elements"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"
import { CiFacebook } from "react-icons/ci"
import { FaInstagram } from "react-icons/fa"
import { CiTwitter } from "react-icons/ci"
import { CiLinkedin } from "react-icons/ci"

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
    <footer className="bg-primary text-white rounded-b-md w-full">
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
            <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
            <p className="mb-4 text-sm">{description}</p>
          </div>

          {/* Dynamic Columns */}
          {cols.map((col, colIndex) => (
            <div key={colIndex}>
              <h3 className="mb-4 text-lg font-semibold text-white">
                {col.title}
              </h3>
              <ul className="space-y-2 text-sm">
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

        {/* Social Links */}
        <div className="mt-8 flex justify-center space-x-6">
          <Link
            target="_blank"
            href={fbLink}
            className="text-blue-300 hover:text-white"
          >
            <CiFacebook size={24} />
          </Link>
          <Link
            target="_blank"
            href={xLink}
            className="text-blue-300 hover:text-white"
          >
            <CiTwitter size={24} />
          </Link>
          <Link
            target="_blank"
            href={insLink}
            className="text-blue-300 hover:text-white"
          >
            <FaInstagram size={24} />
          </Link>
          <Link
            target="_blank"
            href={lnLink}
            className="text-blue-300 hover:text-white"
          >
            <CiLinkedin size={24} />
          </Link>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-blue-900">
        <div className="container mx-auto px-6 py-4">
          <p className="text-center text-sm">{footerBottom}</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterOneDroppedComponent
