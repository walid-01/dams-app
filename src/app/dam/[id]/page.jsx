"use client";

import dams from "@/data/dams.json";

const page = ({ params }) => {
  const dam = dams.find((dam) => dam.id === params.id);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="border-2 border-sky-500 w-2/5 px-20 py-10">
        <p>
          <span className="font-bold">Id : </span>
          {dam.id}
        </p>
        <p>
          <span className="font-bold">Name : </span>
          {dam.name}
        </p>
        <p>
          <span className="font-bold">Narrative : </span>
          {dam.narrative}
        </p>
        <p>
          <span className="font-bold">Opened At : </span>
          {dam.openDate}
        </p>
        <p>
          <span className="font-bold">Water Quality Index : </span>
          {dam.wqi}
        </p>
        <p>
          <span className="font-bold">Order : </span>
          {dam.order}
        </p>
        <p>
          <span className="font-bold">Class : </span>
          {dam.class}
        </p>
        <p>
          <span className="font-bold">Latitude : </span>
          {dam.latitude}
        </p>
        <p>
          <span className="font-bold">Longitude : </span>
          {dam.longitude}
        </p>
      </div>
    </div>
  );
};

export default page;
