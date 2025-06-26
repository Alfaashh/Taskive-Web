interface StoreGridProps {
  activeTab: "pet" | "food"
  searchQuery: string
}

export function StoreGrid({ activeTab, searchQuery }: StoreGridProps) {
  const pets = [
    { id: 1, name: "Cat", price: 240, image: "🐱" },
    { id: 2, name: "Cat", price: 240, image: "🐱" },
    { id: 3, name: "Penguin", price: 240, image: "🐧" },
    { id: 4, name: "Penguin", price: 240, image: "🐧" },
  ]

  const foods = [
    { id: 1, name: "Sushi", price: 257, image: "🍣" },
    { id: 2, name: "Sushi", price: 257, image: "🍣" },
  ]

  const items = activeTab === "pet" ? pets : foods

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl aspect-square p-0 text-center hover:shadow-md transition-shadow cursor-pointer border flex items-center justify-center"
        >
          <div className="flex flex-col items-center justify-end w-full h-full pb-4">
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
