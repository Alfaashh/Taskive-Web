"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"

interface TaskDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  task: any
  onEdit: (task: any) => void
}

export function TaskDetailsModal({ isOpen, onClose, task, onEdit }: TaskDetailsModalProps) {
  if (!task) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white rounded-2xl shadow-xl p-8">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <DialogTitle className="text-xl font-bold sr-only">Task Details</DialogTitle>
          </div>
        </DialogHeader>

        <div className="flex flex-col items-center -mt-16 mb-4">
          <Sparkles className="w-20 h-20 text-purple-500 drop-shadow-lg" />
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">{task.title}</h3>
          </div>

          {task.deadline && (
            <div className="flex justify-center gap-4 mb-4">
              <span className="bg-gray-100 px-4 py-2 rounded-lg font-semibold text-lg flex items-center gap-2 text-gray-700">
                {new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="bg-purple-600/90 text-white px-4 py-2 rounded-lg font-semibold text-lg flex items-center gap-2">
                {new Date(task.deadline).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                <span>📅</span>
              </span>
            </div>
          )}

          <div>
            <h3 className="font-bold text-lg mb-2">Description</h3>
            <div className="bg-gray-50 p-4 rounded-lg min-h-[60px]">
              <p className="text-sm text-gray-700 leading-relaxed">{task.description}</p>
            </div>
          </div>

          <Button onClick={() => onEdit(task)} className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg mt-4">
            Edit Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
