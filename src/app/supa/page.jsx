"use client";
import supabase from "@/config/supabase/supabase";
import { useEffect, useState } from "react";

const page = () => {
  const [fetchError, setFetchError] = useState(null);
  const [dams, setDams] = useState(null);

  //   console.log(supabase);

  useEffect(() => {
    const fetchDams = async () => {
      const { data, error } = await supabase.from("Dams").select();

      if (error) {
        setFetchError(await error.message());
        console.log(error);
        setDams(null);
      }
      if (data) {
        setFetchError(null);
        setDams(data);
      }
    };

    fetchDams();
  }, []);
  return (
    <div>
      {fetchError && <p>{fetchError}</p>}
      {dams && dams.map((dam) => <p>{dam.name}</p>)}
    </div>
  );
};

export default page;
