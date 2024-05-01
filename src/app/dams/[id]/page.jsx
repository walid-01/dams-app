"use client";

import supabase from "@/config/supabase/supabase";
import { useEffect, useState } from "react";
import LineChart from "@/components/LineChart";

const page = ({ params }) => {
  const damId = params.id;
  const [fetchError, setFetchError] = useState(null);
  const [dam, setDam] = useState(null);
  const [months, setMonths] = useState(null);
  const [openCharts, setOpenCharts] = useState({});

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
      console.log(data);
      setMonths(data);
    };

    fetchMonthsByDamId();
  }, [damId]);

  const toggleChart = (attribute) => {
    setOpenCharts((prevOpenCharts) => ({
      ...prevOpenCharts,
      [attribute]: !prevOpenCharts[attribute],
    }));
  };

  if (fetchError) {
    if (fetchError.code === "PGRST116") return notFound();
    return <p>{fetchError.details}</p>;
  }

  return (
    <div className="w-3/4 m-auto h-full pt-20">
      {dam && (
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
                <span>{dam.capacity}</span>
              </p>
            </div>
            <div className="w-1/4">
              <p className="w-full flex justify-between">
                <span className="font-bold">Water Quality Index : </span>
                <span>{dam.wqi}</span>
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
      )}
      {months &&
        Object.keys(months[0])
          .filter(
            (attribute) => attribute !== "dam_id" && attribute !== "month"
          )
          .map((attribute) => (
            <div key={attribute} className="mb-10">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => toggleChart(attribute)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 transition-transform ${
                    openCharts[attribute] && "rotate-90"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
                <h2 className="text-xl">{attribute}</h2>
              </div>
              <div className="flex justify-center">
                {openCharts[attribute] && (
                  <LineChart
                    data={months.map((month) => month[attribute])}
                    months={months.map((month) => month.month)}
                  />
                )}
              </div>
            </div>
          ))}
    </div>
  );
};

export default page;
