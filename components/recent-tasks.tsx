import { Button } from "@/components/ui/button"

export function RecentTasks() {
  const tasks = [
    {
      id: 1,
      title: "Pre Test 1",
      time: "09:30 AM, 5 June",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu vitae pharetra lectus ut lorem.",
      daysLeft: 6,
    },
    {
      id: 2,
      title: "Pre Test 1",
      time: "09:30 AM, 5 June",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu vitae pharetra lectus ut lorem.",
      daysLeft: 6,
    },
    {
      id: 3,
      title: "Pre Test 1",
      time: "09:30 AM, 5 June",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Arcu vitae pharetra lectus ut lorem.",
      daysLeft: 6,
    },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Recent Task</h2>
        <Button variant="ghost" className="text-gradient hover:bg-purple-50">
          See All
        </Button>
      </div>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="gradient-primary text-white p-4 rounded-xl relative shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{task.title}</h3>
                <p className="text-sm opacity-80 mb-2">{task.time}</p>
                <p className="text-sm opacity-90">{task.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                  <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">{task.daysLeft} days left</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
