import dynamic from "next/dynamic"

const WebsiteBuilder = dynamic(
  () => import("@/components/website-builder/website-builder"),
  { ssr: false }
)

export default function Home() {
  return <WebsiteBuilder />
}
