"use client"

import { Laptop, Smartphone, TabletSmartphone } from "lucide-react"
import { cn } from "@/lib/utils"
import { PageSize, Size } from "@/components/context/builder-context"

type ResponsiveContainerPreviewToggleProps = {
  pageConfig: {
    selectedSize: PageSize
    pageSize: string
  }

  handlePageSize: (size: PageSize) => void
}

const ResponsiveContainerPreviewToggle = ({
  pageConfig: { selectedSize },
  handlePageSize,
}: ResponsiveContainerPreviewToggleProps) => {
  const ButtonIcon = ({
    icon: Icon,
    size,
    label,
  }: {
    icon: React.ElementType
    size: Size
    label: string
  }) => (
    <button
      className={cn(
        "h-8 w-8 flex items-center justify-center transition-colors",
        selectedSize === size
          ? "bg-primary text-primary-foreground"
          : "bg-background hover:bg-muted"
      )}
      onClick={() => handlePageSize(size)}
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">{label}</span>
    </button>
  )

  return (
    <div className="flex border rounded-md overflow-hidden">
      <ButtonIcon icon={Laptop} size="desktop" label="Desktop" />
      <ButtonIcon icon={TabletSmartphone} size="tablet" label="Tablet" />
      <ButtonIcon icon={Smartphone} size="mobile" label="Mobile" />
    </div>
  )
}

export default ResponsiveContainerPreviewToggle
