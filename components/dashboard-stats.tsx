"use client"

import { useEffect, useState } from "react"

export function DashboardStats() {
  const [stats, setStats] = useState({
    upcoming: 0,
    today: 0,
    overdue: 0,
  })

  useEffect(() => {
    // Mock function to calculate real stats
    // In real app, this would be an API call to PHP backend
    const calculateStats = () => {
      // Mock tasks with real dates for demonstration
      const mockTasks = [
        { id: 1, deadline: new Date("2024-12-30"), completed: false },
        { id: 2, deadline: new Date("2024-12-31"), completed: false },
        { id: 3, deadline: new Date("2025-01-01"), completed: false },
        { id: 4, deadline: new Date("2025-01-02"), completed: false },
        { id: 5, deadline: new Date("2024-12-20"), completed: false }, // Overdue
        { id: 6, deadline: new Date("2024-12-21"), completed: false }, // Overdue
      ]

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)

      const upcomingCount = mockTasks.filter((task) => !task.completed && task.deadline >= tomorrow).length
      const todayCount = mockTasks.filter((task) => {
        const taskDate = new Date(task.deadline)
        taskDate.setHours(0, 0, 0, 0)
        return !task.completed && taskDate.getTime() === today.getTime()
      }).length
      const overdueCount = mockTasks.filter((task) => !task.completed && task.deadline < today).length

      setStats({
        upcoming: upcomingCount,
        today: todayCount,
        overdue: overdueCount,
      })
    }

    calculateStats()
  }, [])

  const statsData = [
    { label: "Upcoming", count: stats.upcoming, color: "gradient-primary" },
    { label: "Today", count: stats.today, color: "gradient-primary" },
    { label: "Overdue", count: stats.overdue, color: "gradient-accent" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsData.map((stat) => (
        <div key={stat.label} className={`${stat.color} text-white p-8 rounded-2xl shadow-lg`}>
          <h3 className="text-xl font-semibold mb-2">{stat.label}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold">{stat.count}</span>
            <span className="text-lg opacity-80">tasks</span>
          </div>
        </div>
      ))}
    </div>
  )
}
