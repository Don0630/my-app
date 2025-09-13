// pages/HumanResources.jsx
import { useState, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Users } from "lucide-react";
import tabukBrgys from "../data/tabukBrgys.json";
import { hrData } from "../data/hrData";

export default function HumanResources() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const hrLookup = useMemo(
    () => Object.fromEntries(hrData.map((b) => [b.barangay, b.employees])),
    []
  );

  const getColor = (value) =>
    value > 2000
      ? "#006400"
      : value > 1600
      ? "#1F7F1F"
      : value > 1200
      ? "#228B22"
      : value > 800
      ? "#339900"
      : value > 400
      ? "#66B200"
      : "#99CC00";

  const defaultStyle = (feature) => {
    const name = feature.properties.NAME_3;
    const employees = hrLookup[name] || 0;
    return {
      fillColor: getColor(employees),
      weight: 1,
      color: "white",
      fillOpacity: 0.85,
    };
  };

  const highlightStyle = {
    weight: 3,
    color: "#006400",
    fillOpacity: 0.9,
  };

  const onEachFeature = (feature, layer) => {
    const name = feature.properties.NAME_3;
    layer.on("click", () => {
      const employees = hrLookup[name] || 0;
      setSelected({ name, employees, feature });
    });
  };

  const handleSearch = () => {
    const feature = tabukBrgys.features.find(
      (f) => f.properties.NAME_3.toLowerCase() === search.toLowerCase()
    );
    if (feature) {
      const name = feature.properties.NAME_3;
      const employees = hrLookup[name] || 0;
      setSelected({ name, employees, feature });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header - sticky */}
      <div className="bg-green-600 text-white px-4 py-2 flex justify-between items-center sticky top-0 z-[1001]">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <h3 className="font-semibold text-sm sm:text-base">Human Resources</h3>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search Barangay..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-2 py-1 rounded border border-gray-300 text-xs sm:text-sm text-black bg-white"
          />
          <button
            onClick={handleSearch}
            className="px-2 py-1 bg-white text-green-600 rounded shadow flex items-center justify-center"
          >
            <MagnifyingGlassIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
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
        <div className="absolute top-4 left-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow rounded-lg p-3 w-52 z-[1000]">
          <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">
            Barangay Details
          </h3>
          {selected ? (
            <div className="mt-1">
              <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{selected.name}</p>
              <p className="text-xs text-gray-700 dark:text-gray-200">
                Employees: {selected.employees}
              </p>
            </div>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Click a barangay on the map</p>
          )}
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow rounded-lg p-2 text-xs z-[1000] w-40">
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-200 text-center">Employees</h3>
          <ul className="flex flex-col items-center gap-1">
            {[
              { color: "#99CC00", label: "0 - 400" },
              { color: "#66B200", label: "400 - 800" },
              { color: "#339900", label: "800 - 1.2k" },
              { color: "#228B22", label: "1.2k - 1.6k" },
              { color: "#1F7F1F", label: "1.6k - 2.0k" },
              { color: "#006400", label: "2.0k+" },
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 w-full max-w-[120px]">
                <span
                  className="w-3 h-3 block flex-shrink-0"
                  style={{ background: item.color, opacity: 0.85 }}
                ></span>
                <span className="text-xs text-gray-700 dark:text-gray-200 flex-1">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
