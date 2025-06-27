import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useUser } from "../app/user-context"
import { toast } from "@/components/ui/use-toast"

interface StoreItem {
  id: number;
  name: string;
  price: number;
  hp: number;
  image: string;
  imgSehat: string;
  imgSakit: string;
  imgMati: string;
}

interface StoreGridProps {
  activeTab: "pet" | "food"
  searchQuery: string
}

const PET_DESCRIPTIONS: Record<string, string> = {
  Cat: "A cute cat to accompany your productivity journey.",
  Penguin: "A cool penguin to keep you motivated.",
}

export function StoreGrid({ activeTab, searchQuery }: StoreGridProps) {
  const pets: StoreItem[] = [
    {
      id: 1,
      name: "Cat",
      price: 240,
      hp: 100,
      image: "🐱",
      imgSehat: "/cat-sehat.png",
      imgSakit: "/cat-sakit.png",
      imgMati: "/mati.png",
    },
    {
      id: 2,
      name: "Penguin",
      price: 320,
      hp: 200,
      image: "🐧",
      imgSehat: "/penguin-sehat.png",
      imgSakit: "/penguin-sakit.png",
      imgMati: "/mati.png",
    },
  ]

  const foods: StoreItem[] = [
    {
      id: 1,
      name: "Tomat",
      price: 40,
      hp: 20,
      image: "🍅",
      imgSehat: "/tomat.png",
      imgSakit: "",
      imgMati: "",
    },
    {
      id: 2,
      name: "Sushi",
      price: 90,
      hp: 60,
      image: "🍣",
      imgSehat: "/sushi.png",
      imgSakit: "",
      imgMati: "",
    },
  ]

  const items = activeTab === "pet" ? pets : foods
  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // State untuk modal
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [showFeedModal, setShowFeedModal] = useState(false)
  const [selectedPetToFeed, setSelectedPetToFeed] = useState<any>(null)
  const [feedLoading, setFeedLoading] = useState(false)

  const { user, setUser } = useUser();

  const handleCardClick = (item: StoreItem) => {
    setSelectedItem(item)
    setModalOpen(true)
  }

  const handleClose = () => {
    setModalOpen(false)
    setSelectedItem(null)
    setShowFeedModal(false)
    setSelectedPetToFeed(null)
  }

  // Buy Pet
  const handleBuyPet = async () => {
    if (!selectedItem) return;
    setLoading(true)
    try {
      const res = await fetch("http://localhost/web/api/pets.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pet_type: selectedItem.name,
          price: selectedItem.price,
          user_id: 1,
          image: selectedItem.imgSehat,
          name: selectedItem.name
        }),
      })
      const data = await res.json()
      if (data.success) {
        const newPetHealth = data.pet && typeof data.pet.health === 'number'
          ? data.pet.health
          : (selectedItem.name === 'Penguin' ? 200 : 100);
        await setUser({
          ...user,
          coins: user.coins - selectedItem.price,
          pets: [...user.pets, { id: data.pet_id || Date.now(), name: selectedItem.name, status: "Sehat", image: selectedItem.imgSehat, health: newPetHealth }],
        })
        toast({ title: `Success!`, description: `You bought a ${selectedItem.name}.`, variant: "default" })
        setModalOpen(false)
      } else {
        toast({ title: "Failed", description: data.error || "Failed to buy pet.", variant: "destructive" })
      }
    } catch (err) {
      toast({ title: "Error", description: "Network error.", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  // Buy Food: buka modal pilih pet
  const handleBuyFood = () => {
    setShowFeedModal(true)
  }

  // Feed pet
  const handleFeed = async () => {
    if (!selectedPetToFeed || !selectedItem) return;
    setFeedLoading(true)
    try {
      let maxHP = selectedPetToFeed.name === 'Penguin' ? 200 : 100;
      const pets = user.pets.map(p => {
        if (p.id === selectedPetToFeed.id) {
          const newHp = Math.min((p.health ?? maxHP) + selectedItem.hp, maxHP);
          return { ...p, health: newHp };
        }
        return p;
      });
      await setUser({ ...user, coins: user.coins - selectedItem.price, pets });
      toast({ title: `Fed!`, description: `You fed ${selectedPetToFeed.name} (+${selectedItem.hp} HP)`, variant: "default" });
      setShowFeedModal(false);
      setModalOpen(false);
    } finally {
      setFeedLoading(false);
    }
  }

  // Fungsi reset pets
  const handleResetPets = async () => {
    setResetLoading(true)
    try {
      const res = await fetch("http://localhost/web/api/pets.php", { method: "DELETE" })
      const data = await res.json()
      if (data.success) {
        await setUser({ ...user, coins: data.coins, pets: [] })
        toast({ title: "Reset Success!", description: "All pets removed and coins refunded.", variant: "default" })
      } else {
        toast({ title: "Reset Failed", description: data.error || "Failed to reset pets.", variant: "destructive" })
      }
    } catch (err) {
      toast({ title: "Error", description: "Network error.", variant: "destructive" })
    } finally {
      setResetLoading(false)
    }
  }

  // Cek apakah user sudah punya pet tipe ini
  const isOwned = user.pets.some(p => p.name === selectedItem?.name)

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleResetPets} disabled={resetLoading} variant="outline" className="border-red-400 text-red-600 hover:bg-red-50">
          {resetLoading ? "Resetting..." : "Reset Pets (Testing)"}
        </Button>
      </div>
      <div className="flex justify-center gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-br from-purple-200 via-pink-200 to-pink-100 rounded-xl aspect-square w-96 h-96 p-0 text-center hover:shadow-md transition-shadow cursor-pointer border flex items-center justify-center"
            onClick={() => handleCardClick(item)}
          >
            <div className="flex flex-col items-center justify-center w-full h-full">
              {item.imgSehat ? (
                <img src={item.imgSehat} alt={item.name} className="w-28 h-28 object-contain mb-1 rounded-xl bg-white shadow" />
              ) : (
                <div className="text-2xl mb-1">{item.image}</div>
              )}
              <h3 className="font-bold text-base mb-1">{item.name}</h3>
              <div className="flex items-center justify-center gap-1 text-purple-600 font-bold text-base">
                <span>$</span>
                <span>{item.price}</span>
              </div>
              <div className="text-xs text-gray-700 mt-1">HP: {item.hp}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Pop Up Pet Detail & Buy */}
      <Dialog open={modalOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center mb-2">{selectedItem.name}</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center mb-4">
                <img src={selectedItem.imgSehat} alt={selectedItem.name} className="w-32 h-32 object-contain mb-2 rounded-xl bg-white shadow" />
                <div className="flex items-center justify-center gap-1 text-purple-600 font-bold text-lg mb-2">
                  <span>$</span>
                  <span>{selectedItem.price}</span>
                </div>
                <div className="text-base text-gray-700 font-semibold">HP: {selectedItem.hp}</div>
              </div>
              <DialogDescription className="mb-4 text-center">
                {activeTab === "pet"
                  ? PET_DESCRIPTIONS[selectedItem.name] || "No description."
                  : `Feed this to your pet to restore up to ${selectedItem.hp} HP.`}
              </DialogDescription>
              <DialogFooter>
                {activeTab === "pet" ? (
                  isOwned ? (
                    <Button disabled className="w-full bg-gray-300 text-gray-500 text-lg font-bold py-3 rounded-xl cursor-not-allowed">Owned</Button>
                  ) : (
                    <Button onClick={handleBuyPet} disabled={loading} className="w-full bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 text-white text-lg font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
                      {loading ? "Processing..." : `Buy ${selectedItem.name}`}
                    </Button>
                  )
                ) : (
                  <Button onClick={handleBuyFood} className="w-full bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 text-white text-lg font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform">
                    Feed
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal Pilih Pet untuk Feed */}
      <Dialog open={showFeedModal} onOpenChange={() => setShowFeedModal(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center mb-2">Choose a Pet to Feed</DialogTitle>
          </DialogHeader>
          <div className="mb-4">
            {user.pets.length === 0 ? (
              <div className="text-center text-gray-500 py-8">You don't own any pets yet.</div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {user.pets.map((pet: any) => {
                  let maxHP = 100;
                  if (pet.name === 'Penguin') maxHP = 200;
                  const hp = pet.health ?? maxHP;
                  const isFull = hp >= maxHP;
                  return (
                    <div
                      key={pet.id}
                      className={`rounded-xl border p-3 flex flex-col items-center cursor-pointer ${selectedPetToFeed?.id === pet.id ? "ring-2 ring-purple-500" : ""}`}
                      onClick={() => setSelectedPetToFeed(pet)}
                    >
                      <img src={pet.image} alt={pet.name} className="w-16 h-16 object-contain mb-2 rounded-xl bg-white shadow" />
                      <div className="font-bold mb-1">{pet.name}</div>
                      <div className="text-xs text-gray-700">HP: {hp}/{maxHP}</div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={handleFeed}
              disabled={!selectedPetToFeed || (selectedPetToFeed && (() => { let maxHP = selectedPetToFeed.name === 'Penguin' ? 200 : 100; return (selectedPetToFeed.health ?? maxHP) >= maxHP; })()) || feedLoading}
              className="w-full bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 text-white text-lg font-bold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform disabled:bg-gray-300 disabled:text-gray-500"
            >
              {feedLoading ? "Feeding..." : selectedPetToFeed && (() => { let maxHP = selectedPetToFeed.name === 'Penguin' ? 200 : 100; return (selectedPetToFeed.health ?? maxHP) >= maxHP; })() ? "HP Full" : "Feed Selected Pet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
