"use client"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

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
  const [showErrorModal, setShowErrorModal] = useState(false)

  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setShowErrorModal(true)
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

  // Helper untuk format tanggal dd/mm/yyyy
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB"); // dd/mm/yyyy
  };

  return (
    <>
      <Dialog open={isOpen && !showErrorModal} onOpenChange={onClose}>
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
              <div className="w-1/2">
                <div className="flex items-center gap-2 bg-gray-100 border rounded-md px-4 py-2 cursor-pointer">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-gray-100 border-none outline-none flex-1 text-base py-1 cursor-pointer"
                    style={{ appearance: 'none' }}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="flex items-center gap-2 bg-gray-100 border rounded-md px-4 py-2 cursor-pointer">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="bg-gray-100 border-none outline-none flex-1 text-base py-1 cursor-pointer"
                    style={{ appearance: 'none' }}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-2">Description</h3>
              <Textarea
                placeholder="Add a description"
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
      {/* Custom Error Modal di luar Dialog */}
      {showErrorModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-xs w-full text-center">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Task name is required!</h3>
            <p className="mb-6 text-gray-600">Please enter a name for your task.</p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setShowErrorModal(false)}>OK</Button>
          </div>
        </div>
      )}
    </>
  )
}
