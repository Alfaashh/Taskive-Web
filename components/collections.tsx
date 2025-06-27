export function Collections({ pets }: { pets: { id: number, name: string, status: string, image: string, health?: number }[] }) {
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
            {(() => {
              let maxHP = 100;
              if (pet.name === 'Penguin') maxHP = 200;
              const hp = pet.health ?? maxHP;
              let status = pet.status;
              let img = pet.image;
              if (hp <= 0) {
                status = 'Mati';
                if (pet.name === 'Cat') img = '/mati.png';
                if (pet.name === 'Penguin') img = '/mati.png';
              } else if (hp < 0.6 * maxHP) {
                status = 'Sakit';
                if (pet.name === 'Cat') img = '/cat-sakit.png';
                if (pet.name === 'Penguin') img = '/penguin-sakit.png';
              } else {
                status = 'Sehat';
                if (pet.name === 'Cat') img = '/cat-sehat.png';
                if (pet.name === 'Penguin') img = '/penguin-sehat.png';
              }
              return (
                <>
                  <img src={img} alt={pet.name} className="w-20 h-20 object-contain mb-2 rounded-xl bg-white shadow" />
                  <h4 className="font-bold text-base mb-1">{pet.name}</h4>
                  <div className="text-xs text-gray-700 mb-1">HP: {hp}/{maxHP}</div>
                  <span className="bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                    {status}
                  </span>
                </>
              );
            })()}
          </div>
        ))}
      </div>
    </div>
  )
}
