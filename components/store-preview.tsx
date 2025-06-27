"use client";

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function StorePreview() {
  const items = [
    { id: 1, name: "Cat", price: 240, image: "/cat-sehat.png" },
    { id: 2, name: "Penguin", price: 320, image: "/penguin-sehat.png" },
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
            className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl aspect-square min-h-[120px] min-w-0 flex items-center justify-center p-0 text-center hover:shadow-md transition-all duration-200 cursor-pointer border hover:border-purple-200"
          >
            <div className="flex flex-col items-center justify-center w-full h-full">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mb-1 rounded-xl bg-white shadow" />
              <div className="flex items-center justify-center gap-1 text-gradient font-bold">
                <span>$</span>
                <span>{item.price}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{item.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
