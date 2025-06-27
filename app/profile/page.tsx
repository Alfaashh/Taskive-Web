"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProfileStats } from "@/components/profile-stats"
import { Collections } from "@/components/collections"
import { EditProfileModal } from "@/components/edit-profile-modal"
import { Edit } from "lucide-react"
import { useUser } from "../user-context"

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const [showEditModal, setShowEditModal] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Profile</h1>

      {/* Profile Header */}
      <div className="text-center mb-8">
        <img
          src="/placeholder-user.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow"
        />
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <Button variant="ghost" size="icon" onClick={() => setShowEditModal(true)}>
            <Edit className="w-5 h-5" />
          </Button>
        </div>
        <Button onClick={() => setShowEditModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
          Edit your profile
        </Button>
      </div>

      {/* Profile Stats */}
      <ProfileStats level={user.level} nextLevel={user.level+1} currentExp={user.exp} nextLevelExp={user.nextLevelExp} coins={user.coins} />

      {/* Collections */}
      <Collections pets={user.pets} />

      {/* Edit Profile Modal */}
      <EditProfileModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} onNameChange={name => setUser({ ...user, name })} />
    </div>
  )
}
