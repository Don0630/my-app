import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import { useState } from "react";
import useDarkMode from "./hooks/useDarkMode";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [collapsed, setCollapsed] = useState(false); // desktop collapse
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <Router>
      <div className="flex h-screen w-screen bg-gray-100 dark:bg-gray-950">
        {/* Sidebar (desktop only) */}
        <Sidebar collapsed={collapsed} />

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Sidebar Drawer */}
            <div
              className="relative w-64 bg-white dark:bg-gray-900 shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
            >
              <Sidebar collapsed={false} mobile />
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Navbar
            setSidebarOpen={setSidebarOpen}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />
          <div className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              {/* Add more routes here */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
