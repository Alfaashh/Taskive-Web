import Navigation from "./navigation"
import Footer from "footer"

const recentTasks = [
  {
    id: 1,
    title: "Pre Test 1",
    time: "09:30 AM, 5 June",
    description:
      "loremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitamet",
    daysLeft: 6,
  },
  {
    id: 2,
    title: "Pre Test 1",
    time: "09:30 AM, 5 June",
    description:
      "loremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitamet",
    daysLeft: 6,
  },
  {
    id: 3,
    title: "Pre Test 1",
    time: "09:30 AM, 5 June",
    description:
      "loremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitamet",
    daysLeft: 6,
  },
]

const storeItems = [
  { id: 1, name: "Cat", price: 240, image: "🐱" },
  { id: 2, name: "Cat", price: 240, image: "🐱" },
  { id: 3, name: "Cat", price: 240, image: "🐧" },
  { id: 4, name: "Cat", price: 240, image: "🐧" },
]

function Dashboard({ currentPage, setCurrentPage }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={currentPage} onTabChange={setCurrentPage} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Today</h1>
            <p className="text-gray-600">Mon 22, 2021 | 10:00 AM</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600 mb-1">Hi,</p>
            <p className="text-4xl font-bold text-purple-600">Hitam</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Upcoming</h3>
            <div className="flex items-baseline">
              <span className="text-5xl font-bold">16</span>
              <span className="ml-2 text-purple-200">tasks</span>
            </div>
          </div>

          <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Today</h3>
            <div className="flex items-baseline">
              <span className="text-5xl font-bold">10</span>
              <span className="ml-2 text-purple-200">tasks</span>
            </div>
          </div>

          <div className="bg-purple-600 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">Completed</h3>
            <div className="flex items-baseline">
              <span className="text-5xl font-bold">20</span>
              <span className="ml-2 text-purple-200">tasks</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Tasks */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Recent Task</h2>
              <button className="text-purple-600 hover:text-purple-700 font-medium">See All</button>
            </div>

            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div key={task.id} className="bg-purple-600 text-white p-4 rounded-xl">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      <p className="text-purple-200 text-sm">{task.time}</p>
                    </div>
                    <div className="bg-white rounded-full p-2">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-purple-100 text-sm mb-3 line-clamp-3">{task.description}</p>
                  <div className="text-right">
                    <span className="text-purple-200 text-sm">{task.daysLeft} days left</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Make It Yours */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Make It Yours!</h2>
              <button className="text-purple-600 hover:text-purple-700 font-medium">See All</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {storeItems.map((item) => (
                <div key={item.id} className="p-4 text-center border rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-3">{item.image}</div>
                  <div className="flex items-center justify-center text-purple-600 font-semibold mb-1">
                    <span className="mr-1">$</span>
                    <span>{item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Dashboard
