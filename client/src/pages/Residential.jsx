// pages/Residential.jsx
import { useState, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Building } from "lucide-react";
import tabukBrgys from "../data/tabukBrgys.json";
import { populationData } from "../data/populationData";

export default function Residential() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const populationLookup = useMemo(
    () =>
      Object.fromEntries(
        populationData.map((b) => [b.barangay, b.population])
      ),
    []
  );

  // Pink shades
  const getColor = (value) =>
    value > 1200
      ? "#880e4f"
      : value > 1000
      ? "#ad1457"
      : value > 800
      ? "#c2185b"
      : value > 600
      ? "#d81b60"
      : value > 400
      ? "#e91e63"
      : "#f48fb1";

  const defaultStyle = (feature) => {
    const name = feature.properties.NAME_3;
    const population = populationLookup[name] || 0;
    return {
      fillColor: getColor(population),
      weight: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  const highlightStyle = {
    weight: 3,
    color: "#880e4f", // dark pink highlight
    fillOpacity: 0.9,
  };

  const onEachFeature = (feature, layer) => {
    const name = feature.properties.NAME_3;
    layer.on("click", () => {
      const population = populationLookup[name] || 0;
      setSelected({ name, population, feature });
    });
  };

  const handleSearch = () => {
    const feature = tabukBrgys.features.find(
      (f) => f.properties.NAME_3.toLowerCase() === search.toLowerCase()
    );
    if (feature) {
      const name = feature.properties.NAME_3;
      const population = populationLookup[name] || 0;
      setSelected({ name, population, feature });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-1">
      <div className="bg-white dark:bg-gray-800 shadow">
        {/* Card Header with Search */}
<div className="bg-pink-600 text-white px-4 py-2 flex justify-between items-center">
  {/* Left side: Icon + Title */}
  <div className="flex items-center space-x-2">
    <Building className="w-5 h-5" />
    <h3 className="font-semibold text-sm sm:text-base">Residential Population</h3>
  </div>

  {/* Right side: Search */}
  <div className="flex items-center space-x-2 z-[1001]">
    <input
      type="text"
      placeholder="Search Barangay..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="px-2 py-1 rounded border border-gray-300 text-xs text-black bg-white relative z-[1001]"
    />
    <button
      onClick={handleSearch}
      className="px-2 py-1 bg-white text-pink-700 rounded shadow relative z-[1001] flex items-center justify-center"
    >
      <MagnifyingGlassIcon className="w-4 h-4" />
    </button>
  </div>
</div>

        {/* Map Container */}
        <div className="relative h-[800px]">
          <MapContainer
            center={[17.45, 121.45]}
            zoom={11}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <GeoJSON
              data={tabukBrgys}
              style={defaultStyle}
              onEachFeature={onEachFeature}
            />

            {selected && (
              <GeoJSON
                key={selected.name}
                data={selected.feature}
                style={() => highlightStyle}
              />
            )}
          </MapContainer>

          {/* Barangay Details */}
          <div className="absolute top-4 left-4 bg-white/30 dark:bg-white-900/30 backdrop-blur-md shadow rounded-lg p-3 w-52 z-[1000]">
            <h3 className="font-semibold text-gray-700 dark:text-gray-700 text-sm">Barangay Details</h3>
            {selected ? (
              <div className="mt-1">
                <p className="font-bold text-sm text-gray-900 dark:text-gray">{selected.name}</p>
                <p className="text-xs text-gray-700 dark:text-gray-700">
                  Population: {selected.population.toLocaleString()}
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-500 mt-1">Click a barangay on the map</p>
            )}
          </div>

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-white/30 dark:bg-white-900/30 backdrop-blur-md shadow rounded-lg p-2 text-xs z-[1000] w-40">
            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-700 text-center">Population</h3>

            <ul className="flex flex-col items-center gap-1">
              {[
                { color: "#f48fb1", label: "0k - 2.0k" },
                { color: "#e91e63", label: "2.0k - 4.0k" },
                { color: "#d81b60", label: "4.0k - 6.0k" },
                { color: "#c2185b", label: "6.0k - 8.0k" },
                { color: "#ad1457", label: "8.0k - 10.0k" },
                { color: "#880e4f", label: "10.0k+" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 w-full max-w-[120px]">
                  <span
                    className="w-3 h-3 block flex-shrink-0"
                    style={{ background: item.color, opacity: 0.7 }}
                  ></span>
                  <span className="text-xs text-gray-700 dark:text-gray-700 flex-1">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
