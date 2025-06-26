import { Button } from "@/components/ui/button"

export function StorePreview() {
  const items = [
    { id: 1, name: "Cat", price: 240, image: "🐱" },
    { id: 2, name: "Cat", price: 240, image: "🐱" },
    { id: 3, name: "Penguin", price: 240, image: "🐧" },
    { id: 4, name: "Penguin", price: 240, image: "🐧" },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Make It Yours!</h2>
        <Button variant="ghost" className="text-gradient hover:bg-purple-50">
          See All
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl p-4 text-center hover:shadow-md transition-all duration-200 cursor-pointer border hover:border-purple-200"
          >
            <div className="text-4xl mb-2">{item.image}</div>
            <div className="flex items-center justify-center gap-1 text-gradient font-bold">
              <span>$</span>
              <span>{item.price}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
