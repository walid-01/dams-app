"use client";

import Modal from "@/components/modal";
import supabase from "@/config/supabase/supabase";
import { useEffect, useState } from "react";
import LineChart from "@/components/LineChart";
import { formatDate } from "@/utils/formatDate";
import { DamInfo } from "@/components/DamInfo";

const page = ({ params }) => {
  const damId = params.id;
  const [fetchError, setFetchError] = useState(null);
  const [dam, setDam] = useState(null);
  const [months, setMonths] = useState(null);
  const [selectedTab, setSelectedTab] = useState("volume");

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
    <>
      <Modal>
        {dam && <DamInfo dam={dam} />}
        {months && (
          <>
            <div className="flex w-full justify-between items-center">
              {Object.keys(months[0])
                .filter(
                  (attribute) => attribute !== "dam_id" && attribute !== "month"
                )
                .map((attribute) => (
                  <div key={attribute} className="mb-1">
                    <div
                      className="flex items-center cursor-pointer mb-4"
                      onClick={() => setSelectedTab(attribute)}
                    >
                      <h2
                        className={`text-xl ${
                          selectedTab === attribute
                            ? "text-sky-500 font-bold"
                            : ""
                        }`}
                      >
                        {attribute}
                      </h2>
                    </div>
                  </div>
                ))}
            </div>
            <div className="flex justify-center">
              <LineChart
                key={selectedTab} // Add key prop
                data={months.map((month) => month[selectedTab])}
                months={months.map((month) => formatDate(month.month))}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default page;
