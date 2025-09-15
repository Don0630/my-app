// pages/Crime.jsx
import { useState, useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Shield, Search } from "lucide-react";
import tabukBrgys from "../data/tabukBrgys.json";
import { crimeData } from "../data/crimeData";

export default function Crime() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const crimeLookup = useMemo(
    () => Object.fromEntries(crimeData.map((b) => [b.barangay, b.incidents])),
    []
  );

  const getColor = (value) =>
    value > 5
      ? "#990000"
      : value > 4
      ? "#B20000"
      : value > 3
      ? "#CC0000"
      : value > 2
      ? "#E60000"
      : value > 1
      ? "#FF1A1A"
      : "#FF3333";

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
    weight: 0,
    color: "#990000",
    fillOpacity: 0.9,
  };

const onEachFeature = (feature, layer) => {
  const name = feature.properties.NAME_3;
  const incidents = crimeLookup[name] || 0;

  layer.on("click", () => {
    setSelected({ name, incidents, feature });
    layer.setStyle(highlightStyle);
    if (layer.bringToFront) layer.bringToFront();
    layer.openTooltip(); // keep tooltip open when selected
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
      layer.closeTooltip(); // only close if not selected
    }
  });

  layer.bindTooltip(
    `<div style="text-align:center; min-width:80px;">
       <strong>${name}</strong><br/>
       ${incidents} incidents
     </div>`,
    {
      direction: "top",
      sticky: true,
      className: "custom-tooltip",
    }
  );
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
    <div className="flex flex-col h-full">
      {/* Sticky Header */}
      <div className="bg-red-600 text-white px-4 py-2 flex justify-between items-center sticky top-0 z-[1001]">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <h3 className="font-semibold text-sm sm:text-base">Crime Incidents</h3>
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
            className="px-2 py-1 bg-white text-red-600 rounded shadow flex items-center justify-center"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
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
              <p className="font-bold text-sm text-gray-900 dark:text-gray-700">
                {selected.name}
              </p>
              <p className="text-xs text-gray-700 dark:text-gray-700">
                Crime Incidents: {selected.incidents}
              </p>
            </div>
          ) : (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Click a barangay on the map
            </p>
          )}
        </div>

        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/30 dark:bg-white-900/30 backdrop-blur-md shadow-lg rounded-lg p-2 text-xs z-[1000] w-40">
          <h3 className="font-semibold mb-2 text-gray-700 dark:text-gray-700 text-center">
            Crimes
          </h3>
          <ul className="flex flex-col items-center gap-1">
            {[
              { color: "#FF3333", label: "0 - 250" },
              { color: "#FF1A1A", label: "250 - 500" },
              { color: "#E60000", label: "500 - 750" },
              { color: "#CC0000", label: "750 - 1.0k" },
              { color: "#B20000", label: "1.0k - 1.3k" },
              { color: "#990000", label: "1.3k+" },
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
