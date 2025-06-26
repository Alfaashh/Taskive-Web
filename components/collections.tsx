export function Collections({ pets }: { pets: { id: number, name: string, status: string, image: string }[] }) {
  if (!pets || pets.length === 0) return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-6">Collections</h3>
      <div className="text-center text-gray-400 py-8">No pets yet.</div>
    </div>
  );

  return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-6">Collections</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-xl aspect-square min-h-[140px] flex flex-col items-center justify-center shadow-lg border hover:shadow-2xl transition-shadow p-4 text-center"
          >
            <div className="text-5xl mb-2">{pet.image}</div>
            <h4 className="font-bold text-base mb-1">{pet.name}</h4>
            <span className="bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
              {pet.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
