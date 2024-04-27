"use client";

import DamTable from "@/components/DamTable";
import dams from "@/data/dams.json";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <DamTable data={dams} />
    </div>
  );
}
