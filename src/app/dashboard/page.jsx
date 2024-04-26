"use client";

import dynamic from "next/dynamic";

const Dashboard = () => {
  const DynamicMap = dynamic(() => import("@/components/LeafletMap"), {
    ssr: false,
  });

  return (
    <div className="h-full">
      <DynamicMap />
    </div>
  );
};

export default Dashboard;
