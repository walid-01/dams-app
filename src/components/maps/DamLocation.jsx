"use client";

import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const DamLocation = ({ longitude, latitude, name }) => {
  const mapRef = useRef(null);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/6153/6153497.png",
    // iconUrl: "map-marker.png",
    iconSize: [38, 38],
  });

  const recenterMap = () => {
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], 8);
    }
  };

  return (
    <div className="relative h-96 mb-10">
      <MapContainer
        center={[latitude, longitude]}
        zoom={8}
        className="h-full z-0"
        scrollWheelZoom={false}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[latitude, longitude]}
          icon={customIcon}
          draggable={false}
        >
          <Popup>
            <h1 className="text-black text-lg">{name}</h1>
          </Popup>
        </Marker>
      </MapContainer>
      <button
        className="bg-sky-500 text-white font-medium absolute top-2 right-2 z-10 px-4 py-2 rounded-full"
        onClick={recenterMap}
      >
        Recenter Map
      </button>
    </div>
  );
};

export default DamLocation;
