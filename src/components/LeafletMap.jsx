"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import supabase from "@/config/supabase/supabase";

const LeafletMap = () => {
  const [fetchError, setFetchError] = useState(null);
  const [dams, setDams] = useState(null);

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
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [selectedUsages, setSelectedUsages] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

  useEffect(() => {
    const fetchDams = async () => {
      const { data, error } = await supabase.from("Dams").select();

      if (error) {
        setFetchError(error);
        return;
      }

      setFetchError(null);
      setDams(data);
    };

    fetchDams();
  }, []);

  useEffect(() => {
    if (dams) {
      const filtered = dams.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (minWQI === "" || item.wqi >= minWQI) &&
          (maxWQI === "" || item.wqi <= maxWQI) &&
          (minOrder === "" || item.order >= minOrder) &&
          (maxOrder === "" || item.order <= maxOrder) &&
          (selectedRegions.length === 0 ||
            selectedRegions.includes(item.region)) &&
          (selectedUsages.length === 0 ||
            selectedUsages.includes(item.usage)) &&
          (selectedClasses.length === 0 || selectedClasses.includes(item.class))
        );
      });
      setFilteredData(filtered);
    }
  }, [
    dams,
    searchTerm,
    minWQI,
    maxWQI,
    minOrder,
    maxOrder,
    selectedRegions,
    selectedUsages,
    selectedClasses,
  ]);

  const resetFilter = () => {
    setFilteredData(dams);
    setSearchTerm("");
    setMinWQI("");
    setMaxWQI("");
    setMinOrder("");
    setMaxOrder("");
    setSelectedRegions([]);
    setSelectedUsages([]);
    selectedClasses([]);
  };

  const handleRegionChange = (region) => {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  };

  const handleUsageChange = (usage) => {
    if (selectedUsages.includes(usage)) {
      setSelectedUsages(selectedUsages.filter((u) => u !== usage));
    } else {
      setSelectedUsages([...selectedUsages, usage]);
    }
  };

  const handleClassChange = (damClass) => {
    if (selectedClasses.includes(damClass)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== damClass));
    } else {
      setSelectedClasses([...selectedClasses, damClass]);
    }
  };

  if (fetchError) {
    if (fetchError.code === "PGRST116") return notFound();
    return <p>{fetchError.details}</p>;
  }

  return (
    dams && (
      <div className="relative h-full">
        <div>
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
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min WQI"
                  value={minWQI}
                  onChange={(e) => {
                    setMinWQI(e.target.value ? parseFloat(e.target.value) : "");
                  }}
                  className="px-4 py-2 rounded-sm"
                />
                <input
                  type="number"
                  placeholder="Max WQI"
                  value={maxWQI}
                  onChange={(e) =>
                    setMaxWQI(e.target.value ? parseFloat(e.target.value) : "")
                  }
                  className="px-4 py-2 rounded-sm"
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min Order"
                  value={minOrder}
                  onChange={(e) =>
                    setMinOrder(e.target.value ? parseInt(e.target.value) : "")
                  }
                  className="px-4 py-2 rounded-sm"
                />
                <input
                  type="number"
                  placeholder="Max Order"
                  value={maxOrder}
                  onChange={(e) =>
                    setMaxOrder(e.target.value ? parseInt(e.target.value) : "")
                  }
                  className="px-4 py-2 rounded-sm"
                />
              </div>
              <div>
                <p className="text-lg">Region</p>
                <div className="flex gap-6 items-center">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes("East")}
                      onChange={() => handleRegionChange("East")}
                      className="mr-2"
                    />
                    East
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes("West")}
                      onChange={() => handleRegionChange("West")}
                      className="mr-2"
                    />
                    West
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedRegions.includes("Center")}
                      onChange={() => handleRegionChange("Center")}
                      className="mr-2"
                    />
                    Center
                  </label>
                </div>
              </div>
              <div>
                <p>Usage</p>
                <div>
                  <div className="flex gap-6 items-center">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedUsages.includes("AEP")}
                        onChange={() => handleUsageChange("AEP")}
                        className="mr-2"
                      />
                      AEP
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedUsages.includes("IRR")}
                        onChange={() => handleUsageChange("IRR")}
                        className="mr-2"
                      />
                      IRR
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedUsages.includes("TRANS")}
                        onChange={() => handleUsageChange("TRANS")}
                        className="mr-2"
                      />
                      TRANS
                    </label>
                  </div>
                  <div className="flex gap-6 items-center">
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedUsages.includes("AEP-IRR")}
                        onChange={() => handleUsageChange("AEP-IRR")}
                        className="mr-2"
                      />
                      AEP-IRR
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedUsages.includes("TRANS-IRR")}
                        onChange={() => handleUsageChange("TRANS-IRR")}
                        className="mr-2"
                      />
                      TRANS-IRR
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={selectedUsages.includes("AEP-IRR-AEI")}
                        onChange={() => handleUsageChange("AEP-IRR-AEI")}
                        className="mr-2"
                      />
                      AEP-IRR-AEI
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <p>Class</p>
                <div className="flex gap-4 items-center">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedClasses.includes("Poor")}
                      onChange={() => handleClassChange("Poor")}
                      className="mr-1"
                    />
                    Poor
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedClasses.includes("Marginal")}
                      onChange={() => handleClassChange("Marginal")}
                      className="mr-1"
                    />
                    Marginal
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedClasses.includes("Medium")}
                      onChange={() => handleClassChange("Medium")}
                      className="mr-1"
                    />
                    Medium
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedClasses.includes("Good")}
                      onChange={() => handleClassChange("Good")}
                      className="mr-1"
                    />
                    Good
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedClasses.includes("Excellent")}
                      onChange={() => handleClassChange("Excellent")}
                      className="mr-1"
                    />
                    Excellent
                  </label>
                </div>
              </div>
              <p>
                <span className="font-semibold">Showing : </span>
                {filteredData.length} dam
              </p>
              <div className="flex w-full justify-end gap-4">
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
                position={[
                  dam.latitude === 0.0 ? "28.238500" : dam.latitude,
                  dam.longitude === 0.0 ? "2.585951" : dam.longitude,
                ]}
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
                    <p className="text-black">
                      <span className="font-bold">Capacity: </span>
                      {dam.capacity}
                    </p>
                    <p className="text-black">
                      <span className="font-bold">Usage: </span>
                      {dam.usage}
                    </p>
                  </Link>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    )
  );
};

export default LeafletMap;
