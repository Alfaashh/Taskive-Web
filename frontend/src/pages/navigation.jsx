"use client"

function Navigation({ activeTab, onTabChange }) {
  const tabs = ["Dashboard", "Task", "Store", "Profile"]

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left Navigation */}
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-full transition-colors ${
                  activeTab === tab ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => onTabChange(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold">
              <span className="text-gray-900">TASK</span>
              <span className="text-purple-600">IVE</span>
            </div>
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <span className="text-purple-600 mr-1">$</span>
              <span className="font-semibold">240</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
