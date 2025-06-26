import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { TopBar } from "@/components/top-bar"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { UserProvider } from "./user-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Taskive - Gamified Task Management",
  description: "Manage your tasks with gamification elements",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <div className="min-h-screen bg-gray-50">
            <TopBar />
            <main className="pb-20">{children}</main>
            <Footer />
            <Toaster />
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
