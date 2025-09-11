// pages/Dashboard.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function Dashboard() {
  // Example data: 37 bars
  const barData = Array.from({ length: 37 }, (_, i) => ({
    name: `Item ${i + 1}`,
    value: Math.floor(Math.random() * 100) + 1,
  }));

  // Example data for line chart (10 points)
  const lineData = Array.from({ length: 10 }, (_, i) => ({
    name: `Day ${i + 1}`,
    uv: Math.floor(Math.random() * 100) + 10,
    pv: Math.floor(Math.random() * 80) + 20,
  }));

  // Example data for electric, water, and crime
  const electricData = Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    consumption: Math.floor(Math.random() * 100) + 50,
  }));

  const waterData = Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    consumption: Math.floor(Math.random() * 80) + 30,
  }));

  const crimeData = Array.from({ length: 7 }, (_, i) => ({
    day: `Day ${i + 1}`,
    incidents: Math.floor(Math.random() * 20),
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Human Resource Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="bg-green-600 text-white px-4 py-2 rounded-t-xl flex justify-between">
          <h3 className="font-semibold">Human Resource</h3>
          <button className="text-sm">About</button>
        </div>
        <div className="p-4">
          <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
            Graduates: 2,512
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            As of S.Y. 2017-2021
          </p>
          <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
            📊 Chart here
          </div>
        </div>
      </div>

      {/* Residential Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="bg-teal-600 text-white px-4 py-2 rounded-t-xl flex justify-between">
          <h3 className="font-semibold">Residential</h3>
          <button className="text-sm">About</button>
        </div>
        <div className="p-4">
          <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
            Population: 133,844
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By Gender & Age
          </p>
          <div className="h-64 flex items-center justify-center text-gray-400 dark:text-gray-500">
            📊 Chart here
          </div>
        </div>
      </div>

      {/* 37-Bar Graph Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-t-xl flex justify-between">
          <h3 className="font-semibold">37-Bar Graph</h3>
          <button className="text-sm">Details</button>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={false} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Line Chart Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
        <div className="bg-purple-600 text-white px-4 py-2 rounded-t-xl flex justify-between">
          <h3 className="font-semibold">Line Chart</h3>
          <button className="text-sm">Details</button>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
              <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Electric Consumption Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow lg:col-span-2">
        <div className="bg-yellow-500 text-white px-4 py-2 rounded-t-xl flex justify-between">
          <h3 className="font-semibold">Electric Consumption</h3>
          <button className="text-sm">Details</button>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={electricData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="consumption" stroke="#F59E0B" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Water Consumption Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow lg:col-span-2">
        <div className="bg-blue-500 text-white px-4 py-2 rounded-t-xl flex justify-between">
          <h3 className="font-semibold">Water Consumption</h3>
          <button className="text-sm">Details</button>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={waterData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="consumption" stroke="#3B82F6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Crime Statistics Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow lg:col-span-2">
        <div className="bg-red-500 text-white px-4 py-2 rounded-t-xl flex justify-between">
          <h3 className="font-semibold">Crime Statistics</h3>
          <button className="text-sm">Details</button>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={crimeData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="incidents" stroke="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
