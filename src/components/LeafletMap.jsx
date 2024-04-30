import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dams from "@/data/dams.json";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Link from "next/link";

const LeafletMap = () => {
  const bounds = [
    [37.0902, -8.6685], // Southwest coordinates of Algeria
    [18.9601, 11.9995], // Northeast coordinates of Algeria
  ];

  const customIcon = new Icon({
    iconUrl: "map-marker.png",
    iconSize: [38, 38],
  });

  function getColorByClass(quality) {
    switch (quality) {
      case "Poor":
        return "text-red-400";
      case "Marginal":
        return "text-orange-400";
      case "Medium":
        return "text-yellow-400";
      case "Good":
        return "text-green-600";
      case "Excellent":
        return "text-blue-400";
      default:
        return "text-black-400"; // default color
    }
  }

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minWQI, setMinWQI] = useState("");
  const [maxWQI, setMaxWQI] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [maxOrder, setMaxOrder] = useState("");

  useEffect(() => {
    const filtered = dams.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (minWQI === "" || item.wqi >= minWQI) &&
        (maxWQI === "" || item.wqi <= maxWQI) &&
        (minOrder === "" || item.order >= minOrder) &&
        (maxOrder === "" || item.order <= maxOrder)
      );
    });
    setFilteredData(filtered);
  }, [searchTerm, minWQI, maxWQI, minOrder, maxOrder]);

  const resetFilter = () => {
    setFilteredData(dams);
    setSearchTerm("");
    setMinWQI("");
    setMaxWQI("");
    setMinOrder("");
    setMaxOrder("");
  };

  return (
    <div className="relative h-full">
      <div className="">
        {!isFilterOpen && (
          <button
            className="absolute top-0 right-0 z-50 bg-sky-600 text-white px-4 py-2 rounded-full m-4"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            Filter
          </button>
        )}
        {isFilterOpen && (
          <div className="absolute z-40 top-0 right-0 p-4 shadow-md backdrop-blur-md bg-white/30 flex flex-col gap-4 content-center">
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-sm"
            />
            <input
              type="number"
              placeholder="Min WQI"
              value={minWQI}
              onChange={(e) => setMinWQI(parseFloat(e.target.value))}
              className="px-4 py-2 rounded-sm"
            />
            <input
              type="number"
              placeholder="Max WQI"
              value={maxWQI}
              onChange={(e) => setMaxWQI(parseFloat(e.target.value))}
              className="px-4 py-2 rounded-sm"
            />
            <input
              type="number"
              placeholder="Min Order"
              value={minOrder}
              onChange={(e) => setMinOrder(parseInt(e.target.value))}
              className="px-4 py-2 rounded-sm"
            />
            <input
              type="number"
              placeholder="Max Order"
              value={maxOrder}
              onChange={(e) => setMaxOrder(parseInt(e.target.value))}
              className="px-4 py-2 rounded-sm"
            />
            <p>
              <span className="font-semibold">Showing : </span>
              {filteredData.length} dam
            </p>
            <div className="flex w-full justify-between">
              <button
                className="z-50 bg-sky-600 text-white px-4 py-2 rounded-full"
                onClick={() => resetFilter()}
              >
                Reset
              </button>
              <button
                className="z-50 bg-red-500 text-white px-4 py-2 rounded-full"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <MapContainer
        center={[31, 1.6596]}
        zoom={6}
        className="h-full w-full z-10"
        bounds={bounds}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup>
          {filteredData.map((dam) => (
            <Marker
              position={[dam.latitude, dam.longitude]}
              key={dam.id}
              icon={customIcon}
              draggable={false}
            >
              <Popup>
                <Link href={`/dams/${dam.id}`}>
                  <h1 className="text-black text-lg">{dam.name}</h1>
                  <p className="text-black">
                    <span className="font-bold">Quality: </span>
                    <span className={getColorByClass(dam.class)}>
                      {dam.class}
                    </span>
                  </p>
                </Link>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
