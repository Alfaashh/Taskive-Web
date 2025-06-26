"use client";

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function StorePreview() {
  const items = [
    { id: 1, name: "Cat", price: 240, image: "🐱" },
    { id: 2, name: "Cat", price: 240, image: "🐱" },
    { id: 3, name: "Penguin", price: 240, image: "🐧" },
    { id: 4, name: "Penguin", price: 240, image: "🐧" },
  ]

  const router = useRouter()

  return (
    <div className="bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 rounded-2xl p-6 shadow-sm text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Make It Yours!</h2>
        <Button variant="ghost" className="bg-white/90 text-purple-700 font-bold hover:bg-white" onClick={() => router.push('/store')}>
          See All
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl aspect-square p-0 text-center hover:shadow-md transition-all duration-200 cursor-pointer border hover:border-purple-200 flex items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="text-4xl mb-2">{item.image}</div>
              <div className="flex items-center justify-center gap-1 text-gradient font-bold">
                <span>$</span>
                <span>{item.price}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
