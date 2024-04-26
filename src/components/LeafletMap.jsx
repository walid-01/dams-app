"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dams from "@/data/dams.json";
import { Icon } from "leaflet";

const LeafletMap = () => {
  const bounds = [
    [37.0902, -8.6685], // Southwest coordinates of Algeria
    [18.9601, 11.9995], // Northeast coordinates of Algeria
  ];

  const customIcon = new Icon({
    iconUrl: "map-marker.png",
    iconSize: [38, 38],
  });

  return (
    <div className="h-full">
      <MapContainer
        center={[31, 1.6596]}
        zoom={6}
        // scrollWheelZoom={false}
        // style={{ height: "100%", width: "100%" }}
        className="h-full w-full"
        bounds={bounds}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {dams.map((dam) => (
          <Marker
            position={[dam.latitude, dam.longitude]}
            key={dam.id}
            icon={customIcon}
            draggable={false}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
