interface StoreGridProps {
  activeTab: "pet" | "food"
  searchQuery: string
}

export function StoreGrid({ activeTab, searchQuery }: StoreGridProps) {
  const pets = [
    { id: 1, name: "Penguin", price: 257, image: "🐧" },
    { id: 2, name: "Penguin", price: 257, image: "🐧" },
    { id: 3, name: "Penguin", price: 257, image: "🐧" },
    { id: 4, name: "Penguin", price: 257, image: "🐧" },
    { id: 5, name: "Penguin", price: 257, image: "🐧" },
    { id: 6, name: "Penguin", price: 257, image: "🐧" },
  ]

  const foods = [
    { id: 1, name: "Sushi", price: 257, image: "🍣" },
    { id: 2, name: "Sushi", price: 257, image: "🍣" },
    { id: 3, name: "Sushi", price: 257, image: "🍣" },
    { id: 4, name: "Sushi", price: 257, image: "🍣" },
    { id: 5, name: "Sushi", price: 257, image: "🍣" },
    { id: 6, name: "Sushi", price: 257, image: "🍣" },
  ]

  const items = activeTab === "pet" ? pets : foods

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">{item.image}</div>
            <h3 className="font-bold text-lg mb-2">{item.name}</h3>
            <div className="flex items-center justify-center gap-1 text-purple-600 font-bold text-lg">
              <span>$</span>
              <span>{item.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
