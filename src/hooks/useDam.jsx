import supabase from "@/config/supabase/supabase";

const useDam = () => {
  const fetchDams = async () => {
    const { data, error } = await supabase.from("Dams").select();
    return { data, error };
  };

  const fetchDamById = async (id) => {
    const { data, error } = await supabase
      .from("Dams")
      .select()
      .eq("id", id)
      .single();
    return { data, error };
  };

  const fetchDamMonthlyData = async (id) => {
    const { data, error } = await supabase
      .from("Months")
      .select()
      .eq("dam_id", id);
    return { data, error };
  };

  return { fetchDams, fetchDamById, fetchDamMonthlyData };
};

export default useDam;
