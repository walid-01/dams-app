"use client";

import supabase from "@/config/supabase/supabase";
import { useEffect, useState } from "react";
import { DamInfo } from "@/components/DamInfo";
import dynamic from "next/dynamic";
import DamInfoModes from "@/components/DamInfoModes";

const DamById = ({ params }) => {
  const DynamicMap = dynamic(() => import("@/components/maps/DamLocation"), {
    ssr: false,
  });

  const damId = params.id;
  const [fetchError, setFetchError] = useState(null);
  const [dam, setDam] = useState(null);
  const [months, setMonths] = useState(null);

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

  useEffect(() => {
    const fetchMonthsByDamId = async () => {
      const { data, error } = await supabase
        .from("Months")
        .select()
        .eq("dam_id", damId);

      if (error) {
        setFetchError(error);
        return;
      }
      setFetchError(null);
      // console.log(data);
      setMonths(data);
    };

    fetchMonthsByDamId();
  }, [damId]);

  if (fetchError) {
    if (fetchError.code === "PGRST116") return notFound();
    return <p>{fetchError.details}</p>;
  }

  return (
    <div className="w-11/12 m-auto h-full pt-20">
      {dam && (
        <>
          <DamInfo dam={dam} />
          <DynamicMap
            longitude={dam.longitude}
            latitude={dam.latitude}
            name={dam.name}
          />
          {months && <DamInfoModes months={months} damName={dam.name} />}
        </>
      )}
    </div>
  );
};

export default DamById;
