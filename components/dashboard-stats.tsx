"use client"

import { useEffect, useState, useRef } from "react"

export function DashboardStats({ refreshTrigger }: { refreshTrigger?: number }) {
  const [stats, setStats] = useState({
    upcoming: 0,
    today: 0,
    overdue: 0,
  })
  const intervalRef = useRef<any>(null)

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost/web/api/tasks.php?user_id=1&dashboard=1')
      const data = await res.json()
      if (data.success && data.dashboard) {
        setStats({
          upcoming: data.dashboard.upcoming,
          today: data.dashboard.today,
          overdue: data.dashboard.overdue,
        })
      }
    } catch (err) {
      // fallback: biarkan tetap 0
    }
  }

  useEffect(() => {
    fetchStats()
    intervalRef.current = setInterval(fetchStats, 60000)
    return () => clearInterval(intervalRef.current)
  }, [])

  useEffect(() => {
    if (refreshTrigger !== undefined) fetchStats()
  }, [refreshTrigger])

  const statsData = [
    { label: "Upcoming", count: stats.upcoming, color: "bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400" },
    { label: "Today", count: stats.today, color: "bg-gradient-to-br from-purple-700 via-purple-500 to-pink-400" },
    { label: "Overdue", count: stats.overdue, color: "bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsData.map((stat) => (
        <div key={stat.label} className={`${stat.color} text-white p-8 rounded-2xl shadow-lg relative ${stat.label === "Overdue" ? "border-4 border-rose-400 animate-pulse" : ""}`}>
          <h3 className="text-xl font-semibold mb-2 drop-shadow-[0_1px_4px_rgba(60,0,80,0.5)]">{stat.label}</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold drop-shadow-[0_1px_4px_rgba(60,0,80,0.7)]">{stat.count}</span>
            <span className="text-lg opacity-80 font-bold drop-shadow-[0_1px_4px_rgba(60,0,80,0.7)]">tasks</span>
          </div>
        </div>
      ))}
    </div>
  )
}
