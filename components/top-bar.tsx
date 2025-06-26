"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { DollarSign } from "lucide-react"

export function TopBar() {
  const pathname = usePathname()

  // Mock user data - in real app, this would come from authentication/session
  const user = {
    coins: 240,
  }

  const navItems = [
    { name: "Dashboard", href: "/" },
    { name: "Task", href: "/tasks" },
    { name: "Store", href: "/store" },
    { name: "Profile", href: "/profile" },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Navigation */}
          <nav className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "gradient-primary text-white shadow-md"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-2xl font-bold">
              TASK<span className="text-gradient">IVE</span>
            </h1>
          </div>

          {/* Coins - Dynamic from user data */}
          <div className="flex items-center gap-2 gradient-accent text-white px-4 py-2 rounded-full shadow-md">
            <DollarSign className="w-5 h-5" />
            <span className="font-bold">{user.coins}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
