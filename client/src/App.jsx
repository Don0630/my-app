import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import useDarkMode from "./hooks/useDarkMode";
import Sidebar from "./components/SideBar";
import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import Maps from "./pages/Maps";
import Analytics from "./pages/Analytics";
import Transportation from "./pages/Transportation";
import Water from "./pages/Water";
import Electricity from "./pages/Electricity";
import Residential from "./pages/Residential";
import Business from "./pages/Business";
import Crime from "./pages/Crime";
import HumanResources from "./pages/HumanResources";

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
          <div className="fixed inset-0 z-[1002] flex md:hidden">
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
              <Route path="/Analytics" element={<Analytics />} />
              <Route path="/transport" element={<Transportation />} />
              <Route path="/maps" element={<Maps />} />
              <Route path="/water" element={<Water />} />
              <Route path="/electricity" element={<Electricity />} />
              <Route path="/residential" element={<Residential />} />
              <Route path="/business" element={<Business />} />
              <Route path="/crime" element={<Crime />} />
              <Route path="/human" element={<HumanResources />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
