"use client"

import { useState, useEffect } from "react"
import { TaskList } from "@/components/task-list"
import { CreateTaskModal } from "@/components/create-task-modal"
import { EditTaskModal } from "@/components/edit-task-modal"
import { TaskDetailsModal } from "@/components/task-details-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [tasks, setTasks] = useState<any[]>([])

  // Ganti dengan user_id yang sesuai (sementara hardcode 1)
  const userId = 1;

  const fetchTasks = async () => {
    try {
      const res = await fetch(`http://localhost/web/api/tasks.php?user_id=${userId}`);
      const data = await res.json();
      if (data.success) {
        setTasks(data.tasks);
      } else {
        console.error("Failed to fetch tasks:", data.error);
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskClick = (task: any) => {
    setSelectedTask(task)
    setShowDetailsModal(true)
  }

  const handleEditTask = (task: any) => {
    setSelectedTask(task)
    setShowDetailsModal(false)
    setShowEditModal(true)
  }

  // Handler setelah task berhasil ditambah
  const handleTaskAdded = () => {
    setShowCreateModal(false)
    fetchTasks()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Task</h1>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setActiveTab("active")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              activeTab === "active" ? "bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 text-white shadow-md" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            My Tasks
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              activeTab === "completed" ? "bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 text-white shadow-md" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Search and Create Task */}
      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 hover:opacity-90 text-white px-6 shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Task
        </Button>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
        {tasks.length === 0 ? (
          <div className="text-gray-400 text-center py-8 font-semibold">You don't have any task for now</div>
        ) : (
          <TaskList
            tasks={tasks}
            activeTab={activeTab}
            searchQuery={searchQuery}
            onTaskClick={handleTaskClick}
          />
        )}
      </div>

      {/* Modals */}
      <CreateTaskModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onTaskAdded={handleTaskAdded} />

      <EditTaskModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} task={selectedTask} onTaskUpdated={handleTaskAdded} />

      <TaskDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        task={selectedTask}
        onEdit={handleEditTask}
      />
    </div>
  )
}
