"use client"

import { useState } from "react"
import Navigation from "./navigation"
import Footer from "footer"

const storeItems = {
  Food: [
    { id: 1, name: "Sushi", price: 257, image: "🍣" },
    { id: 2, name: "Sushi", price: 257, image: "🍣" },
    { id: 3, name: "Sushi", price: 257, image: "🍣" },
    { id: 4, name: "Sushi", price: 257, image: "🍣" },
    { id: 5, name: "Sushi", price: 257, image: "🍣" },
    { id: 6, name: "Sushi", price: 257, image: "🍣" },
  ],
  Pet: [
    { id: 1, name: "Penguin", price: 257, image: "🐧" },
    { id: 2, name: "Penguin", price: 257, image: "🐧" },
    { id: 3, name: "Penguin", price: 257, image: "🐧" },
    { id: 4, name: "Penguin", price: 257, image: "🐧" },
    { id: 5, name: "Penguin", price: 257, image: "🐧" },
    { id: 6, name: "Penguin", price: 257, image: "🐧" },
  ],
}

function StorePage({ currentPage, setCurrentPage }) {
  const [storeCategory, setStoreCategory] = useState("Food")

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={currentPage} onTabChange={setCurrentPage} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Store</h1>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-full p-1">
            <button
              className={`px-8 py-2 rounded-full transition-colors ${
                storeCategory === "Pet" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setStoreCategory("Pet")}
            >
              Pet
            </button>
            <button
              className={`px-8 py-2 rounded-full transition-colors ${
                storeCategory === "Food" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setStoreCategory("Food")}
            >
              Food
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Store Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeItems[storeCategory].map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 text-center border rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-6xl mb-4">{item.image}</div>
              <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
              <div className="flex items-center justify-center text-purple-600 font-bold text-lg">
                <span className="mr-1">$</span>
                <span>{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default StorePage
