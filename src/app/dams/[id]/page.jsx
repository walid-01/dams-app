"use client";

import supabase from "@/config/supabase/supabase";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

const SingleDamPage = ({ params }) => {
  const damId = params.id;
  const [fetchError, setFetchError] = useState(null);
  const [dam, setDam] = useState(null);

  useEffect(() => {
    const fetchDamById = async () => {
      const { data, error } = await supabase
        .from("Dams")
        .select()
        .eq("id", damId)
        .single();

      if (error) {
        setFetchError(error);
        // console.log(error);
        return;
      }
      setFetchError(null);
      setDam(data);
    };

    fetchDamById();
  }, [damId]);

  if (fetchError) {
    if (fetchError.code === "PGRST116") return notFound();
    return <p>{fetchError.details}</p>;
  }

  return (
    <>
      {dam && (
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
              {dam.date_opened}
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
            <p>
              <span className="font-bold">Region : </span>
              {dam.region}
            </p>
            <p>
              <span className="font-bold">Usage : </span>
              {dam.usage}
            </p>
            <p>
              <span className="font-bold">Capacity : </span>
              {dam.capacity}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleDamPage;
