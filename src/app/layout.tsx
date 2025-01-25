import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/toaster"

import dynamic from "next/dynamic"

const BuilderContextProvider = dynamic(
  () => import("@/components/context/builder-context"),
  { ssr: false }
)

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Mini Website Builder - Rekaz",
  description: "A mini website builder with drag and drop functionality",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full mx-auto h-screen flex flex-col`}
      >
        <BuilderContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            themes={["light", "dark"]}
          >
            {children}
          </ThemeProvider>
        </BuilderContextProvider>
        <Toaster />
      </body>
    </html>
  )
}
