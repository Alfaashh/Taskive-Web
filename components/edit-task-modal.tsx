"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Trash2 } from "lucide-react"
import { useUser } from "../app/user-context"

interface EditTaskModalProps {
  isOpen: boolean
  onClose: () => void
  task: any
  onTaskUpdated?: () => void
}

export function EditTaskModal({ isOpen, onClose, task, onTaskUpdated }: EditTaskModalProps) {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const { user, setUser } = useUser();

  useEffect(() => {
    if (task) {
      setTitle(task.title || "")
      if (task.deadline) {
        const d = new Date(task.deadline)
        setDate(d.toISOString().slice(0, 10))
        setTime(d.toTimeString().slice(0,5))
      } else {
        setDate("")
        setTime("")
      }
      setDescription(task.description || "")
    }
  }, [task])

  const handleSave = async () => {
    setLoading(true)
    const deadline = date && time ? `${date} ${time}` : date || null
    const res = await fetch("http://localhost/web/api/tasks.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, title, description, deadline })
    })
    const data = await res.json()
    setLoading(false)
    if (data.success) {
      onClose()
      if (onTaskUpdated) onTaskUpdated()
    } else {
      alert(data.error || "Failed to update task")
    }
  }

  const handleMarkDone = async () => {
    setLoading(true)
    const res = await fetch("http://localhost/web/api/tasks.php", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id, completed: 1 })
    })
    const data = await res.json()
    setLoading(false)
    if (data.success) {
      let baseXp = typeof user.xp === 'number' && !isNaN(user.xp) ? user.xp : 0;
      let newXp = baseXp + 20;
      let newLevel = user.level;
      let nextLevelExp = (newLevel + 1) * 100;
      let newCoins = user.coins + 15;
      // Level up logic
      while (newXp >= nextLevelExp) {
        newXp -= nextLevelExp;
        newLevel += 1;
        nextLevelExp = (newLevel + 1) * 100;
      }
      await setUser({ ...user, xp: newXp, level: newLevel, coins: newCoins });
      onClose()
      if (onTaskUpdated) onTaskUpdated()
    } else {
      alert(data.error || "Failed to mark as done")
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    const res = await fetch("http://localhost/web/api/tasks.php", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: task.id })
    })
    const data = await res.json()
    setLoading(false)
    setShowDeleteConfirm(false)
    if (data.success) {
      onClose()
      if (onTaskUpdated) onTaskUpdated()
    } else {
      alert(data.error || "Failed to delete task")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white rounded-2xl shadow-xl p-8">
        <DialogHeader>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <DialogTitle className="text-2xl font-bold">Edit Task</DialogTitle>
            </div>
            <Button variant="ghost" size="icon" className="text-red-500" onClick={() => setShowDeleteConfirm(true)} disabled={loading}>
              <Trash2 className="w-6 h-6" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Input
              placeholder="Meeting with board"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-2xl font-bold border-l-4 border-l-purple-600 bg-white"
            />
          </div>

          <div className="flex gap-4">
            <Input
              value={time}
              onChange={e => setTime(e.target.value)}
              type="time"
              className="bg-gray-200 text-gray-700 font-semibold w-1/2"
            />
            <Input
              value={date}
              onChange={e => setDate(e.target.value)}
              type="date"
              className="bg-purple-900 text-white px-4 py-2 rounded w-1/2 font-semibold"
            />
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Description</h3>
            <Textarea
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu vitae pharetra lectus ut lorem. Purus at a amet phasellus. Tempus Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu vitae pharetra lectus ut lorem."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-base"
            />
          </div>

          <div className="space-y-3 pt-2">
            <Button
              onClick={handleSave}
              disabled={loading}
              variant="outline"
              className="w-full py-3 border-2 border-purple-600 text-purple-700 font-bold text-lg hover:bg-purple-50 hover:border-purple-700 hover:text-purple-800 transition"
            >
              Confirm Edit
            </Button>
            <Button
              onClick={handleMarkDone}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg"
            >
              Mark as Done
            </Button>
          </div>
        </div>

        {/* Custom Delete Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl shadow-xl p-8 max-w-xs w-full text-center">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Delete this task?</h3>
              <p className="mb-6 text-gray-600">This action cannot be undone.</p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" className="w-1/2" onClick={() => setShowDeleteConfirm(false)} disabled={loading}>Cancel</Button>
                <Button className="w-1/2 bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete} disabled={loading}>Delete</Button>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
