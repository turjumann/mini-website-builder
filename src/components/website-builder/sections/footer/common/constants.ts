import { SectionElementInstance } from "@/components/website-builder/sections/section-elements"

export const footerInstanceProperties = {
  title: "About Us",
  description:
    "We are dedicated to empowering businesses with cutting-edge digital solutions.",
  fbLink: "#",
  xLink: "#",
  insLink: "#",
  lnLink: "#",
  cols: [
    {
      title: "Quick Links",
      links: [
        {
          title: "Home",
          link: "#",
        },
        {
          title: "About",
          link: "#",
        },
        {
          title: "Services",
          link: "#",
        },
        {
          title: "Contact",
          link: "#",
        },
      ],
    },
    {
      title: "Services",
      links: [
        {
          title: "Web Development",
          link: "#",
        },
        {
          title: "App Development",
          link: "#",
        },
        {
          title: "UI/UX Design",
          link: "#",
        },
        {
          title: "Digital Marketing",
          link: "#",
        },
      ],
    },
    {
      title: "Contact Us",
      links: [
        {
          title: "info@example.com",
          link: "#",
        },
        {
          title: "123 Digital Street, Tech City, 12345",
          link: "#",
        },
        {
          title: "+966548888011",
          link: "#",
        },
      ],
    },
  ],
  footerBottom: "© 2025 Your Company Name. All rights reserved.",
}
export type CustomFooterInstance = SectionElementInstance & {
  instanceProperties: typeof footerInstanceProperties
}
