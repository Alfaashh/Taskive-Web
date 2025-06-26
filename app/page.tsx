"use client";
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentTasks } from "@/components/recent-tasks"
import { StorePreview } from "@/components/store-preview"
import { ToastTest } from "@/components/ToastTest"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { useUser } from "./user-context"

export default function Dashboard() {
  const pathname = usePathname();
  const currentDate = new Date()
  const dateString = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  const timeString = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })

  const { user } = useUser();

  const [refreshTrigger, setRefreshTrigger] = useState(0)

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastTest />
      {/* Header Section */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Today</h1>
          <p className="text-gray-600">
            {dateString} | {timeString}
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-bold">
            Hi, <span className="text-gradient">{user.name.split(' ')[0]}</span>
          </h2>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats key={pathname} refreshTrigger={refreshTrigger} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <RecentTasks onTaskChanged={() => setRefreshTrigger(t => t + 1)} />
        <StorePreview />
      </div>
    </div>
  )
}
