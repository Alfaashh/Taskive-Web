import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Store from "./pages/Store";
import User from "./pages/User";
import Task from "./pages/Task";
import EditTask from "./pages/EditTask";
import StoreDetails from "./pages/StoreDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/store" element={<Store />} />
        <Route path="/user" element={<User />} />
        <Route path="/task" element={<Task />} />
        <Route path="/edit-task/:id" element={<EditTask />} />
        <Route path="/store-details/:id" element={<StoreDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
