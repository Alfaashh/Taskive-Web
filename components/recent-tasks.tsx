"use client";
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { TaskDetailsModal } from "./task-details-modal"
import { useRouter } from "next/navigation"
import { EditTaskModal } from "./edit-task-modal"

export function RecentTasks({ onTaskChanged }: { onTaskChanged?: () => void }) {
  const [tasks, setTasks] = useState<any[]>([])
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const router = useRouter()
  const [tick, setTick] = useState(0);

  const fetchTasks = async () => {
    const res = await fetch("http://localhost/web/api/tasks.php?user_id=1&upcoming=1&limit=3")
    const data = await res.json()
    if (data.success) setTasks(data.tasks)
  }
  useEffect(() => { fetchTasks() }, [])

  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 60000); // update setiap 1 menit
    return () => clearInterval(interval);
  }, []);

  // Helper: hitung sisa hari ke deadline
  const getDaysLeft = (deadline: string) => {
    if (!deadline) return "-"
    const now = new Date()
    const end = new Date(deadline)
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    return end < now ? "Overdue" : `${diff} days left`
  }

  return (
    <div className="bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 rounded-2xl p-6 shadow-md h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white drop-shadow-[0_1px_4px_rgba(60,0,80,0.7)]">Recent Tasks</h2>
        <Button variant="ghost" className="bg-white/90 text-purple-700 font-bold hover:bg-white" onClick={() => window.location.href = '/tasks'}>
          See All
        </Button>
      </div>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-white text-center py-8 font-semibold drop-shadow-[0_1px_4px_rgba(60,0,80,0.7)]">You don't have any task for now</div>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between py-5 px-4 min-h-[72px] rounded-lg border border-gray-300 bg-white/80 hover:bg-white transition-all cursor-pointer" onClick={() => { setSelectedTask(task); setShowDetails(true); }}>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base mb-0.5 truncate">{task.title}</h3>
                <p className="text-xs opacity-80 mb-0.5 truncate">
                  {task.deadline ? new Date(task.deadline).toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "No deadline"}
                </p>
                <p className="text-xs opacity-90 line-clamp-1 text-gray-600">{task.description}</p>
              </div>
              <div className="flex flex-col items-end ml-4">
                <span className={`text-xs font-bold ${task.deadline ? (getDaysLeft(task.deadline) === "Overdue" ? "text-rose-600" : "text-gray-700") : "text-gray-400"}`} style={{ textShadow: task.deadline ? (!task.deadline ? '0 1px 4px rgba(60,0,80,0.5)' : undefined) : undefined }}>{task.deadline ? getDaysLeft(task.deadline) : "No deadline"}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <TaskDetailsModal
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        task={selectedTask}
        onEdit={() => {
          setShowDetails(false);
          setShowEditModal(true);
        }}
      />
      <EditTaskModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        task={selectedTask}
        onTaskUpdated={() => {
          setShowEditModal(false);
          setSelectedTask(null);
          fetchTasks();
          if (onTaskChanged) onTaskChanged();
        }}
      />
    </div>
  )
}
