import React from "react";
export function DamInfo({ dam }) {
  return (
    <div>
      <h1 className="text-xl mb-5">{dam.name}</h1>
      <div className="flex w-full justify-between gap-16 mb-5">
        <div className="w-1/4">
          <p className="w-full flex justify-between">
            <span className="font-bold">Station ID : </span>
            <span>{dam.id}</span>
          </p>
          <p className="w-full flex justify-between">
            <span className="font-bold">Latitude : </span>
            <span>{dam.latitude}</span>
          </p>
          <p className="w-full flex justify-between">
            <span className="font-bold">Longitude : </span>
            <span>{dam.longitude}</span>
          </p>
        </div>
        <div className="w-1/4">
          <p className="w-full flex justify-between">
            <span className="font-bold">Region : </span>
            <span>{dam.region}</span>
          </p>
          <p className="w-full flex justify-between">
            <span className="font-bold">Usage : </span>
            <span>{dam.usage}</span>
          </p>
          <p className="w-full flex justify-between">
            <span className="font-bold">Capacity : </span>
            <span>
              {dam.capacity} Hm<sup>3</sup>
            </span>
          </p>
        </div>
        <div className="w-1/4">
          <p className="w-full flex justify-between">
            <span className="font-bold">Water Quality Index : </span>
            <span>{dam.wqi}%</span>
          </p>
          <p className="w-full flex justify-between">
            <span className="font-bold">Order : </span>
            <span>{dam.order}</span>
          </p>
          <p className="w-full flex justify-between">
            <span className="font-bold">Class : </span>
            <span>{dam.class}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
