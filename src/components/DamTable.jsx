"use client";

import supabase from "@/config/supabase/supabase";
import { useEffect, useState } from "react";

const DamTable = () => {
  const [fetchError, setFetchError] = useState(null);
  const [dams, setDams] = useState(null);

  useEffect(() => {
    const fetchDams = async () => {
      const { data, error } = await supabase.from("Dams").select();

      if (error) {
        setFetchError(error);
        // console.log(error);
        return;
      }

      setFetchError(null);
      setDams(data);
    };

    fetchDams();
  }, []);

  if (fetchError) {
    if (fetchError.code === "PGRST116") return notFound();
    return <p>{fetchError.details}</p>;
  }

  return (
    <div>
      {fetchError && <p>{fetchError}</p>}
      {dams && (
        <table>
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">WQI</th>
              <th className="px-4 py-2">Order</th>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Narrative</th>
              <th className="px-4 py-2">Region</th>
              <th className="px-4 py-2">Usage</th>
              <th className="px-4 py-2">Capacity</th>
              <th className="px-4 py-2">Open Date</th>
            </tr>
          </thead>
          <tbody>
            {dams.map((dam) => (
              <tr
                key={dam.id}
                onClick={() => {
                  window.location.href = `/dams/${dam.id}`;
                }}
                className="border-2 hover:border-gray-400 hover:cursor-pointer"
              >
                <td className="px-4 py-2">{dam.id}</td>
                <td className="px-4 py-2">{dam.wqi}</td>
                <td className="px-4 py-2">{dam.order}</td>
                <td className="px-4 py-2">{dam.class}</td>
                <td className="px-4 py-2">{dam.name}</td>
                <td className="px-4 py-2">{dam.narrative}</td>
                <td className="px-4 py-2">{dam.region}</td>
                <td className="px-4 py-2">{dam.usage}</td>
                <td className="px-4 py-2">{dam.capacity}</td>
                <td className="px-4 py-2">{dam.date_opened}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DamTable;
