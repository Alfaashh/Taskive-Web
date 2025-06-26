import { DashboardStats } from "@/components/dashboard-stats"
import { RecentTasks } from "@/components/recent-tasks"
import { StorePreview } from "@/components/store-preview"

export default function Dashboard() {
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

  // Mock user data - in real app, this would come from authentication/session
  const user = {
    name: "Zayn Javadd Malik",
    firstName: "Zayn",
  }

  return (
    <div className="container mx-auto px-4 py-8">
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
            Hi, <span className="text-gradient">{user.firstName}</span>
          </h2>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <RecentTasks />
        <StorePreview />
      </div>
    </div>
  )
}
