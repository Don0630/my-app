// pages/Analytics.jsx
import { useState, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import tabukBrgys from "../data/tabukBrgys.json";
import { businessData, floodData } from "../data/analyticsData";

// ✅ Lucide React icons
import { Briefcase, Droplet } from "lucide-react";

export default function Analytics() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("business"); // "business" | "flood"

  // Lookup tables
  const businessLookup = useMemo(
    () => Object.fromEntries(businessData.map((b) => [b.barangay, b.businesses])),
    []
  );
  const floodLookup = useMemo(
    () => Object.fromEntries(floodData.map((f) => [f.barangay, f.risk])),
    []
  );

  // Color scales
  const getBusinessColor = (value) =>
    value > 30
      ? "#800026"
      : value > 20
      ? "#BD0026"
      : value > 15
      ? "#E31A1C"
      : value > 10
      ? "#FC4E2A"
      : value > 5
      ? "#FD8D3C"
      : "#FEB24C";

  const getFloodColor = (risk) =>
    risk === "High"
      ? "#08519c"
      : risk === "Moderate"
      ? "#3182bd"
      : risk === "Low"
      ? "#6baed6"
      : "#c6dbef";

  // Default barangay style
  const defaultStyle = (feature) => {
    const name = feature.properties.NAME_3;
    if (activeTab === "business") {
      const businesses = businessLookup[name] || 0;
      return {
        fillColor: getBusinessColor(businesses),
        weight: 1,
        color: "white",
        fillOpacity: 0.7,
      };
    } else {
      const risk = floodLookup[name] || "None";
      return {
        fillColor: getFloodColor(risk),
        weight: 1,
        color: "white",
        fillOpacity: 0.7,
      };
    }
  };

  // Highlight style
  const highlightStyle = {
    weight: 3,
    color: "#111",
    fillOpacity: 0.9,
  };

  // Click event for barangays
  const onEachFeature = (feature, layer) => {
    const name = feature.properties.NAME_3;
    layer.on("click", () => {
      if (activeTab === "business") {
        const businesses = businessLookup[name] || 0;
        setSelected({ name, value: businesses });
      } else {
        const risk = floodLookup[name] || "None";
        setSelected({ name, value: risk });
      }
    });
  };

  // Search handler
  const handleSearch = () => {
    const feature = tabukBrgys.features.find(
      (f) => f.properties.NAME_3.toLowerCase() === search.toLowerCase()
    );
    if (feature) {
      const name = feature.properties.NAME_3;
      if (activeTab === "business") {
        const businesses = businessLookup[name] || 0;
        setSelected({ name, value: businesses, feature });
      } else {
        const risk = floodLookup[name] || "None";
        setSelected({ name, value: risk, feature });
      }
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-1">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
      
{/* Header with Tabs + Icons */}
<div className="bg-gray-200 dark:bg-gray-700 flex items-center space-x-2 rounded-t-xl px-2">
  {[
    { id: "business", label: "Business Analytics", icon: <Briefcase size={16} /> },
    { id: "flood", label: "Flood Assessment", icon: <Droplet size={16} /> },
  ].map((tab) => {
    const isActive = activeTab === tab.id;
    return (
      <div
        role="tab"
        key={tab.id}
        onClick={() => {
          setActiveTab(tab.id);
          setSelected(null);
        }}
        className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all border outline-none focus:ring-0 cursor-pointer select-none
          ${
            isActive
              ? "bg-white dark:bg-gray-900 border-gray-300 border-b-0 shadow-md font-semibold z-10 text-black dark:text-white"
              : "bg-transparent text-gray-600 dark:text-gray-300 border-transparent hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
      >
        {/* Icon always visible, color changes if active */}
        <span className={`${isActive ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"}`}>
          {tab.icon}
        </span>

        {/* Text: hidden on small screens (mobile), shown on desktop) */}
        <span className="hidden sm:inline">{tab.label}</span>
      </div>
    );
  })}
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

            <GeoJSON data={tabukBrgys} style={defaultStyle} onEachFeature={onEachFeature} />

            {selected?.feature && (
              <GeoJSON key={selected.name} data={selected.feature} style={() => highlightStyle} />
            )}
          </MapContainer>

          {/* Details card */}
          <div className="absolute top-4 left-4 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow rounded-lg p-3 w-52 z-[1000]">
            <h3 className="font-semibold text-gray-700 text-sm">Barangay Details</h3>
            {selected ? (
              <div className="mt-1">
                <p className="font-bold text-sm">{selected.name}</p>
                <p className="text-xs text-gray-600">
                  {activeTab === "business"
                    ? `Businesses: ${selected.value}`
                    : `Flood Risk: ${selected.value}`}
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-500 mt-1">Click a barangay on the map</p>
            )}
          </div>

          {/* Legend */}
          <div className="absolute top-4 right-4 bg-white/30 dark:bg-gray-900/30 backdrop-blur-md shadow rounded-lg p-2 text-xs z-[1000] w-40">
            <h3 className="font-semibold mb-1">
              {activeTab === "business" ? "Businesses" : "Flood Risk"}
            </h3>
            <ul className="space-y-0.5">
              {activeTab === "business"
                ? [
                    { color: "#FEB24C", label: "0–5" },
                    { color: "#FD8D3C", label: "6–10" },
                    { color: "#FC4E2A", label: "11–15" },
                    { color: "#E31A1C", label: "16–20" },
                    { color: "#BD0026", label: "21–30" },
                    { color: "#800026", label: "31+" },
                  ].map((item, idx) => (
                    <li key={idx}>
                      <span
                        className="inline-block w-3 h-3 mr-1"
                        style={{ background: item.color, opacity: 0.7 }}
                      ></span>
                      {item.label}
                    </li>
                  ))
                : [
                    { color: "#08519c", label: "High" },
                    { color: "#3182bd", label: "Moderate" },
                    { color: "#6baed6", label: "Low" },
                    { color: "#c6dbef", label: "None" },
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
