"use client"

import { useState } from "react"
import Dashboard from "pages/dashboard"
import TaskPage from "pages/task"
import StorePage from "pages/store"
import ProfilePage from "pages/profile"
import "App.css"

function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "Dashboard":
        return <Dashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case "Task":
        return <TaskPage currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case "Store":
        return <StorePage currentPage={currentPage} setCurrentPage={setCurrentPage} />
      case "Profile":
        return <ProfilePage currentPage={currentPage} setCurrentPage={setCurrentPage} />
      default:
        return <Dashboard currentPage={currentPage} setCurrentPage={setCurrentPage} />
    }
  }

  return <div className="App">{renderPage()}</div>
}

export default App
