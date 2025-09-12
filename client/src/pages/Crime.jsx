// pages/Crime.jsx
import { useState, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import tabukBrgys from "../data/tabukBrgys.json";
import { crimeData } from "../data/crimeData";

export default function Crime() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const crimeLookup = useMemo(
    () =>
      Object.fromEntries(
        crimeData.map((b) => [b.barangay, b.incidents])
      ),
    []
  );

  const getColor = (value) =>
    value > 5
      ? "#8B0000"
      : value > 4
      ? "#B22222"
      : value > 3
      ? "#DC143C"
      : value > 2
      ? "#FF4500"
      : value > 1
      ? "#FF6347"
      : "#FFA07A";

  const defaultStyle = (feature) => {
    const name = feature.properties.NAME_3;
    const incidents = crimeLookup[name] || 0;
    return {
      fillColor: getColor(incidents),
      weight: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  const highlightStyle = {
    weight: 3,
    color: "#8B0000",
    fillOpacity: 0.9,
  };

  const onEachFeature = (feature, layer) => {
    const name = feature.properties.NAME_3;
    layer.on("click", () => {
      const incidents = crimeLookup[name] || 0;
      setSelected({ name, incidents, feature });
    });
  };

  const handleSearch = () => {
    const feature = tabukBrgys.features.find(
      (f) => f.properties.NAME_3.toLowerCase() === search.toLowerCase()
    );
    if (feature) {
      const name = feature.properties.NAME_3;
      const incidents = crimeLookup[name] || 0;
      setSelected({ name, incidents, feature });
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-1">
      <div className="bg-white dark:bg-gray-800  shadow">
        {/* Card Header with Search */}
        <div className="bg-red-600 text-white px-4 py-2 flex justify-between items-center">
          <h3 className="font-semibold">Crime Incidents</h3>
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
              className="px-2 py-1 bg-white text-red-700 rounded shadow relative z-[1001] flex items-center justify-center"
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
<div className="absolute top-4 left-4 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow rounded-lg p-3 w-52 z-[1000]">
  <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Barangay Details</h3>
  {selected ? (
    <div className="mt-1">
      <p className="font-bold text-sm text-gray-900 dark:text-white">{selected.name}</p>
      <p className="text-xs text-gray-700 dark:text-gray-300">
        Crime Incidents: {selected.incidents}
      </p>
    </div>
  ) : (
    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
      Click a barangay on the map
    </p>
  )}
</div>

{/* Legend */}
<div className="absolute top-4 right-4 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow rounded-lg p-2 text-xs z-[1000] w-40">
  <h3 className="font-semibold mb-1 text-gray-700 dark:text-gray-200">Crime Incidents</h3>
  <ul className="space-y-0.5 text-gray-700 dark:text-gray-300">
    {[
      { color: "#FFA07A", label: "0–1" },
      { color: "#FF6347", label: "2" },
      { color: "#FF4500", label: "3" },
      { color: "#DC143C", label: "4" },
      { color: "#B22222", label: "5" },
      { color: "#8B0000", label: "6+" },
    ].map((item, idx) => (
      <li key={idx}>
        <span
          className="inline-block w-3 h-3 mr-1"
          style={{ background: item.color, opacity: 0.7 }}
        ></span>
        {item.label}
      </li>
    ))}
  </ul>
</div>

        </div>
      </div>
    </div>
  );
}
