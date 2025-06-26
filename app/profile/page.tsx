"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProfileStats } from "@/components/profile-stats"
import { Collections } from "@/components/collections"
import { EditProfileModal } from "@/components/edit-profile-modal"
import { Edit } from "lucide-react"

export default function ProfilePage() {
  const [showEditModal, setShowEditModal] = useState(false)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Profile</h1>

      {/* Profile Header */}
      <div className="text-center mb-8">
        <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-2xl font-bold">Zayn Javadd Malik</h2>
          <Button variant="ghost" size="icon" onClick={() => setShowEditModal(true)}>
            <Edit className="w-5 h-5" />
          </Button>
        </div>
        <Button onClick={() => setShowEditModal(true)} className="bg-purple-600 hover:bg-purple-700 text-white">
          Edit your profile
        </Button>
      </div>

      {/* Profile Stats */}
      <ProfileStats />

      {/* Collections */}
      <Collections />

      {/* Edit Profile Modal */}
      <EditProfileModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} />
    </div>
  )
}
