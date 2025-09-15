// pages/FloodAnalytics.jsx
import { useState, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css"; 
import { Droplet, Search } from "lucide-react";
import tabukBrgys from "../data/tabukBrgys.json";
import { floodData } from "../data/analyticsData";

export default function FloodAnalytics() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const floodLookup = useMemo(
    () => Object.fromEntries(floodData.map((f) => [f.barangay, f.risk])),
    []
  );

  const getColor = (risk) =>
    risk === "High"
      ? "#08519c"
      : risk === "Moderate"
      ? "#3182bd"
      : risk === "Low"
      ? "#6baed6"
      : "#c6dbef";

  const defaultStyle = (feature) => {
    const name = feature.properties.NAME_3;
    const risk = floodLookup[name] || "None";
    return {
      fillColor: getColor(risk),
      weight: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  const highlightStyle = {
    weight: 0,
    color: "#08519c",
    fillOpacity: 0.9,
  };

  const onEachFeature = (feature, layer) => {
    const name = feature.properties.NAME_3;
    const risk = floodLookup[name] || "None";

    layer.bindTooltip(
      `<div style="text-align:center; min-width:80px;">
         <strong>${name}</strong><br/>
         ${risk} risk
       </div>`,
      {
        direction: "top",
        sticky: true,
        className: "custom-tooltip",
      }
    );

    layer.on("click", () => {
      setSelected({ name, risk, feature });
      layer.setStyle(highlightStyle);
      if (layer.bringToFront) layer.bringToFront();
      layer.openTooltip();
    });

    layer.on("mouseover", () => {
      if (!selected || selected.name !== name) {
        layer.setStyle(highlightStyle);
      }
      layer.openTooltip();
    });

    layer.on("mouseout", () => {
      if (!selected || selected.name !== name) {
        layer.setStyle(defaultStyle(feature));
        layer.closeTooltip();
      }
    });
  };

  const handleSearch = () => {
    const feature = tabukBrgys.features.find(
      (f) => f.properties.NAME_3.toLowerCase() === search.toLowerCase()
    );
    if (feature) {
      const name = feature.properties.NAME_3;
      const risk = floodLookup[name] || "None";
      setSelected({ name, risk, feature });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center sticky top-0 z-[1001]">
        <div className="flex items-center space-x-2">
          <Droplet className="w-5 h-5" />
          <h3 className="font-semibold text-sm sm:text-base">Flood Assessment</h3>
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
            className="px-2 py-1 bg-white text-blue-700 rounded shadow flex items-center justify-center"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Map */}
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

          <GeoJSON data={tabukBrgys} style={defaultStyle} onEachFeature={onEachFeature} />

          {selected && (
            <GeoJSON
              key={selected.name}
              data={selected.feature}
              style={() => highlightStyle}
            />
          )}
        </MapContainer>

        {/* Barangay Details */}
        <div className="absolute top-4 left-4 bg-white/30 backdrop-blur-md shadow-lg rounded-lg p-3 w-52 z-[1000]">
          <h3 className="font-semibold text-gray-700 text-sm">Barangay Details</h3>
          {selected ? (
            <div className="mt-1">
              <p className="font-bold text-sm text-gray-900">{selected.name}</p>
              <p className="text-xs text-gray-700">Flood Risk: {selected.risk}</p>
            </div>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Click a barangay on the map</p>
          )}
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md shadow-lg rounded-lg p-2 text-xs z-[1000] w-40">
          <h3 className="font-semibold mb-2 text-gray-700 text-center">Flood Risk</h3>
          <ul className="flex flex-col items-center gap-1">
            {[
              { color: "#c6dbef", label: "None" },
              { color: "#6baed6", label: "Low" },
              { color: "#3182bd", label: "Moderate" },
              { color: "#08519c", label: "High" },
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 w-full max-w-[120px]">
                <span
                  className="w-3 h-3 block flex-shrink-0"
                  style={{ background: item.color, opacity: 0.7 }}
                ></span>
                <span className="text-xs text-gray-700 flex-1">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
