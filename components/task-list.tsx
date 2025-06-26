"use client"

interface TaskListProps {
  tasks: any[]
  activeTab: "active" | "completed"
  searchQuery: string
  onTaskClick: (task: any) => void
}

export function TaskList({ tasks, activeTab, searchQuery, onTaskClick }: TaskListProps) {
  const filteredTasks = tasks.filter((task) => {
    const matchesTab = activeTab === "active" ? task.completed == 0 : task.completed == 1
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description || "").toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => {
        let isOverdue = false;
        if (task.deadline && task.completed == 0) {
          const now = new Date();
          const end = new Date(task.deadline);
          isOverdue = end < new Date(now.getFullYear(), now.getMonth(), now.getDate());
        }
        return (
          <div
            key={task.id}
            onClick={() => onTaskClick(task)}
            className={`${isOverdue ? "bg-gradient-to-r from-pink-200 to-pink-100 text-pink-900" : "bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400 text-white"} p-6 rounded-xl cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-xl mb-2">{task.title}</h3>
                <p className="text-sm opacity-80 mb-3">{task.deadline ? new Date(task.deadline).toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "No deadline"}</p>
                <p className="text-sm opacity-90 leading-relaxed">{task.description}</p>
              </div>
              <div className="flex flex-col items-end gap-3 ml-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                  <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                </div>
                {/* Bisa tambahkan info days left jika ingin */}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
