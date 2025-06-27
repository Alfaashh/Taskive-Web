"use client"

import { useState } from "react"
import { StoreGrid } from "@/components/store-grid"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function StorePage() {
  const [activeTab, setActiveTab] = useState<"pet" | "food">("pet")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Store</h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setActiveTab("pet")}
            className={`px-8 py-2 rounded-full font-medium transition-all duration-200 ${
              activeTab === "pet" ? "bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 text-white shadow-md" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Pet
          </button>
          <button
            onClick={() => setActiveTab("food")}
            className={`px-8 py-2 rounded-full font-medium transition-all duration-200 ${
              activeTab === "food" ? "bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 text-white shadow-md" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Food
          </button>
        </div>
      </div>

      {/* Store Grid */}
      <StoreGrid activeTab={activeTab} searchQuery={searchQuery} />
    </div>
  )
}
