// pages/Electricity.jsx
import { useState, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Zap } from "lucide-react"; 
import tabukBrgys from "../data/tabukBrgys.json";
import { electricityConsumption } from "../data/electricityData";

export default function Electricity() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const electricityLookup = useMemo(
    () => Object.fromEntries(
      electricityConsumption.map((b) => [b.barangay, b.consumption])
    ),
    []
  );

  const getColor = (value) =>
    value > 50000
      ? "#4b0082"
      : value > 40000
      ? "#6a0dad"
      : value > 30000
      ? "#9370db"
      : value > 20000
      ? "#b19cd9"
      : value > 10000
      ? "#d8bfd8"
      : "#e6e6fa";

  const defaultStyle = (feature) => {
    const name = feature.properties.NAME_3;
    const consumption = electricityLookup[name] || 0;
    return {
      fillColor: getColor(consumption),
      weight: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  const highlightStyle = {
    weight: 3,
    color: "#4b0082",
    fillOpacity: 0.9,
  };

  const onEachFeature = (feature, layer) => {
    const name = feature.properties.NAME_3;
    layer.on("click", () => {
      const consumption = electricityLookup[name] || 0;
      setSelected({ name, consumption, feature });
    });
  };

  const handleSearch = () => {
    const feature = tabukBrgys.features.find(
      (f) => f.properties.NAME_3.toLowerCase() === search.toLowerCase()
    );
    if (feature) {
      const name = feature.properties.NAME_3;
      const consumption = electricityLookup[name] || 0;
      setSelected({ name, consumption, feature });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header - sticky */}
      <div className="bg-purple-600 text-white px-4 py-2 flex justify-between items-center sticky top-0 z-[1001]">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <h3 className="font-semibold text-sm sm:text-base">Electricity Consumption</h3>
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
            className="px-2 py-1 bg-white text-purple-700 rounded shadow flex items-center justify-center"
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
        <div className="absolute top-4 left-4 bg-white/30 dark:bg-white-900/30 backdrop-blur-md shadow-lg rounded-lg p-3 w-52 z-[1000]">
          <h3 className="font-semibold text-gray-700 dark:text-gray-700 text-sm">
            Barangay Details
          </h3>
          {selected ? (
            <div className="mt-1">
              <p className="font-bold text-sm text-gray-900 dark:text-gray-700">{selected.name}</p>
              <p className="text-xs text-gray-700 dark:text-gray-700">
                Power: {selected.consumption.toLocaleString()} kWh
              </p>
            </div>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Click a barangay on the map</p>
          )}
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/30 dark:bg-white-900/30 backdrop-blur-md shadow-lg rounded-lg p-2 text-xs z-[1000] w-40">
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-700 text-center">
            Consumption (kWh)
          </h3>
          <ul className="flex flex-col items-center gap-1">
            {[
              { color: "#e6e6fa", label: "0k - 10.0k" },
              { color: "#d8bfd8", label: "10.0k - 20.0k" },
              { color: "#b19cd9", label: "20.0k - 30.0k" },
              { color: "#9370db", label: "30.0k - 40.0k" },
              { color: "#6a0dad", label: "40.0k - 50.0k" },
              { color: "#4b0082", label: "50.0k+" },
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
  );
}
