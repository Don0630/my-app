// pages/Transportation.jsx
import { useState, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Bus } from "lucide-react"; 
import tabukBrgys from "../data/tabukBrgys.json";
import { transportData } from "../data/transportData";

export default function Transportation() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const transportLookup = useMemo(
    () =>
      Object.fromEntries(
        transportData.map((b) => [b.barangay, b.vehicles])
      ),
    []
  );

  // Orange shades
  const getColor = (value) =>
    value > 50
      ? "#FF4500"
      : value > 40
      ? "#FF6347"
      : value > 30
      ? "#FF7F50"
      : value > 20
      ? "#FFA07A"
      : value > 10
      ? "#FFB347"
      : "#FFD580";

  const defaultStyle = (feature) => {
    const name = feature.properties.NAME_3;
    const vehicles = transportLookup[name] || 0;
    return {
      fillColor: getColor(vehicles),
      weight: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  const highlightStyle = {
    weight: 3,
    color: "#FF4500",
    fillOpacity: 0.9,
  };

  const onEachFeature = (feature, layer) => {
    const name = feature.properties.NAME_3;
    layer.on("click", () => {
      const vehicles = transportLookup[name] || 0;
      setSelected({ name, vehicles, feature });
    });
  };

  const handleSearch = () => {
    const feature = tabukBrgys.features.find(
      (f) => f.properties.NAME_3.toLowerCase() === search.toLowerCase()
    );
    if (feature) {
      const name = feature.properties.NAME_3;
      const vehicles = transportLookup[name] || 0;
      setSelected({ name, vehicles, feature });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-1">
      <div className="bg-white dark:bg-gray-800 shadow">
        {/* Header with search */}

<div className="bg-orange-600 text-white px-4 py-2 flex justify-between items-center">
  {/* Left side: Icon + Title */}
  <div className="flex items-center space-x-2">
    <Bus className="w-5 h-5" />
    <h3 className="font-semibold text-sm sm:text-base">Transportation</h3>
  </div>

  {/* Right side: Search */}
  <div className="flex items-center space-x-2 z-[1001]">
    <input
      type="text"
      placeholder="Search Barangay..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="px-2 py-1 rounded border border-gray-300 text-xs text-black relative z-[1001]"
    />
    <button
      onClick={handleSearch}
      className="px-2 py-1 bg-white text-orange-600 rounded shadow relative z-[1001] flex items-center justify-center"
    >
      <MagnifyingGlassIcon className="w-4 h-4" />
    </button>
  </div>
</div>


        {/* Map */}
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
            <h3 className="font-semibold text-gray-700 text-sm">Barangay Details</h3>
            {selected ? (
              <div className="mt-1">
                <p className="font-bold text-sm">{selected.name}</p>
                <p className="text-xs text-gray-600">
                  Vehicles: {selected.vehicles}
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-500 mt-1">Click a barangay on the map</p>
            )}
          </div>

          {/* Legend stays unchanged */}
          <div className="absolute top-4 right-4 bg-white/30 dark:bg-white-900/30 backdrop-blur-md shadow rounded-lg p-2 text-xs z-[1000] w-40">
            <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-700 text-center">Vehicles</h3>

            <ul className="flex flex-col items-center gap-1">
              {[
                { color: "#FEB24C", label: "0 - 400" },
                { color: "#FD8D3C", label: "400 - 800" },
                { color: "#FC4E2A", label: "800 - 1.2k" },
                { color: "#E31A1C", label: "1.2k - 1.6k" },
                { color: "#BD0026", label: "1.6k - 2.0k" },
                { color: "#800026", label: "2.0k+" },
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
