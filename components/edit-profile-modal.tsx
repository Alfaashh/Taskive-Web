"use client"

import { useState, useEffect, useRef } from "react"
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
  const [profileImg, setProfileImg] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('profileImg') || "/placeholder-user.jpg";
    }
    return "/placeholder-user.jpg";
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => { setName(user.name) }, [user.name]);

  const handleSave = async () => {
    // Update user context & database
    await setUser({ ...user, name });
    if (onNameChange) onNameChange(name)
    onClose()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result as string;
        setProfileImg(url);
        if (typeof window !== 'undefined') {
          localStorage.setItem('profileImg', url);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <img
              src={profileImg}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow"
            />
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>Change Photo</Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
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
