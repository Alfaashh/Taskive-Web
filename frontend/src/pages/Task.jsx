"use client"

import { useState } from "react"
import Navigation from "./navigation"
import Footer from "footer"

const tasks = [
  {
    id: 1,
    title: "Pre Test 1",
    time: "09:30 AM, 5 June",
    description:
      "loremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitamet",
    daysLeft: 6,
    completed: false,
  },
  {
    id: 2,
    title: "Pre Test 1",
    time: "09:30 AM, 5 June",
    description:
      "loremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitamet",
    daysLeft: 6,
    completed: false,
  },
  {
    id: 3,
    title: "Pre Test 1",
    time: "09:30 AM, 5 June",
    description:
      "loremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitamet",
    daysLeft: 6,
    completed: false,
  },
  {
    id: 4,
    title: "Pre Test 1",
    time: "09:30 AM, 5 June",
    description:
      "loremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitametloremipsumdolorsitamet",
    daysLeft: 6,
    completed: false,
  },
]

function TaskPage({ currentPage, setCurrentPage }) {
  const [taskFilter, setTaskFilter] = useState("My Tasks")

  const filteredTasks = tasks.filter((task) => (taskFilter === "My Tasks" ? !task.completed : task.completed))

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={currentPage} onTabChange={setCurrentPage} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">My Task</h1>

        {/* Task Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-full p-1">
            <button
              className={`px-8 py-2 rounded-full transition-colors ${
                taskFilter === "My Tasks" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setTaskFilter("My Tasks")}
            >
              My Tasks
            </button>
            <button
              className={`px-8 py-2 rounded-full transition-colors ${
                taskFilter === "Completed" ? "bg-purple-600 text-white" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setTaskFilter("Completed")}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Search and Create Task */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl flex items-center transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Task
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-purple-600 text-white p-6 rounded-xl shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-xl mb-1">{task.title}</h3>
                  <p className="text-purple-200">{task.time}</p>
                </div>
                <div className="bg-white rounded-full p-3">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-purple-100 mb-4 leading-relaxed">{task.description}</p>

              <div className="text-right">
                <span className="text-purple-200">{task.daysLeft} days left</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default TaskPage
