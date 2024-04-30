"use client";

import dams from "@/data/dams.json";

const page = ({ params }) => {
  const dam = dams.find((dam) => dam.id === params.id);
  return (
    <div className="">
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
  );
};

export default page;
