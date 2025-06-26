"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Clock } from "lucide-react"

interface CreateTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onTaskAdded?: () => void
}

export function CreateTaskModal({ isOpen, onClose, onTaskAdded }: CreateTaskModalProps) {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Task name is required!")
      return
    }

    setLoading(true)

    try {
      const user_id = 1
      let deadline = null
      if (date && time) deadline = `${date} ${time}`
      else if (date) deadline = date

      const res = await fetch("http://localhost/web/api/tasks.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, title, description, deadline })
      })

      // Cek jika response bukan JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        throw new Error(`Invalid response from server: ${text}`);
      }
      
      const data = await res.json()
      if (data.success) {
        setTitle("")
        setTime("")
        setDate("")
        setDescription("")
        onClose()
        if (onTaskAdded) onTaskAdded()
      } else {
        throw new Error(data.error || "Failed to add task")
      }
    } catch (error: any) {
      alert(error.message || "An unexpected error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <DialogTitle className="text-xl font-bold">Create New Task</DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Input
              placeholder="Meeting with board"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg font-medium border-l-4 border-l-purple-600"
            />
          </div>

          <div className="flex gap-4">
            <div className="relative w-1/2">
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="HH:mm"
                className="bg-gray-100 cursor-pointer pr-10"
              />
              <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative w-1/2">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="YYYY-MM-DD"
                className="bg-gray-100 cursor-pointer pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Description</h3>
            <Textarea
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu vitae pharetra lectus ut lorem. Purus at a amet phasellus. Tempus Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu vitae pharetra lectus ut lorem."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
