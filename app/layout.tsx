import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { cookies } from "next/headers"
import { SidebarStateIndicator } from "@/components/sidebar-state-indicator"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next.js Sidebar App",
  description: "A modern Next.js application with collapsible sidebar navigation",
  generator: "v0.dev",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out">
              <Header />
              <main className="flex-1 p-6 transition-all duration-300 ease-in-out">{children}</main>
              <Footer />
            </div>
            <SidebarStateIndicator />
          </div>
          <Toaster position="top-right" richColors />
        </SidebarProvider>
      </body>
    </html>
  )
}
