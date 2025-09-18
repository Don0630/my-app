// pages/Home.jsx
import { BarChart, Map } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      className="flex flex-col h-full bg-cover bg-center"
      style={{ backgroundImage: "url('src/assets/map 3.jpg')" }} // place your image in /public/images/bg-city.jpg
    >
      {/* Overlay */}
      <div className="flex-1 bg-black/40 flex flex-col items-center justify-center text-center px-6">
        {/* Hero Section */}
        <section className="py-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-sm">
            Explore Tabuk City Analytics
          </h1>
          <p className="text-gray-200 max-w-2xl mx-auto text-lg">
            Interactive maps and data visualizations for crime, transportation,
            water, electricity, and more.
          </p>
        </section>

        {/* Quick Links Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 pb-16 w-full max-w-3xl">
          {/* Card 1 */}
          <Link
            to="/analytics"
            className="bg-white/90 dark:bg-gray-800/90 shadow-md rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition"
          >
            <BarChart className="w-10 h-10 text-blue-600 mb-3" />
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
              Analytics Dashboard
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              Insights and trends from the city’s datasets.
            </p>
          </Link>

          {/* Card 2 */}
          <Link
            to="/maps"
            className="bg-white/90 dark:bg-white-800/90 shadow-md rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition"
          >
            <Map className="w-10 h-10 text-green-600 mb-3" />
            <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
              Interactive Maps
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
              Explore barangay-level visualizations.
            </p>
          </Link>
        </section>
      </div>
    </div>
  );
}
