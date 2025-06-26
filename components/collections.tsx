export function Collections() {
  const pets = [
    { id: 1, name: "Penguin", status: "Healthy", image: "🐧" },
    { id: 2, name: "Penguin", status: "Healthy", image: "🐧" },
    { id: 3, name: "Penguin", status: "Healthy", image: "🐧" },
  ]

  return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-6">Collections</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow text-center"
          >
            <div className="text-6xl mb-4">{pet.image}</div>
            <h4 className="font-bold text-lg mb-2">{pet.name}</h4>
            <span className="gradient-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              {pet.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
