// pages/Dashboard.jsx
export default function Dashboard() {
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
    </div>
  );
}
