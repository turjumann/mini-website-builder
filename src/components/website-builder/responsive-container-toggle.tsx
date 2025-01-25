"use client"

import { Laptop, Smartphone, TabletSmartphone } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import useBuilder from "@/hooks/use-builder"
import { Size } from "@/components/context/builder-context"

export function ResponsiveContainerToggle() {
  const {
    pageConfig: { selectedSize },
    handlePageSize,
  } = useBuilder()

  const ButtonIcon = ({
    icon: Icon,
    size,
    label,
  }: {
    icon: React.ElementType
    size: Size
    label: string
  }) => (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
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
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  )

  return (
    <TooltipProvider>
      <div className="flex border rounded-md overflow-hidden">
        <ButtonIcon icon={Laptop} size="desktop" label="Desktop" />
        <ButtonIcon icon={TabletSmartphone} size="tablet" label="Tablet" />
        <ButtonIcon icon={Smartphone} size="mobile" label="Mobile" />
      </div>
    </TooltipProvider>
  )
}
