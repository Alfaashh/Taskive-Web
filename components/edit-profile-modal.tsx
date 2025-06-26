"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useUser } from "../app/user-context"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  onNameChange?: (name: string) => void
}

export function EditProfileModal({ isOpen, onClose, onNameChange }: EditProfileModalProps) {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user.name);
  useEffect(() => { setName(user.name) }, [user.name]);

  const handleSave = async () => {
    // Update user context & database
    await setUser({ ...user, name });
    if (onNameChange) onNameChange(name)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <Button variant="outline">Change Photo</Button>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3">
            Save your edit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
