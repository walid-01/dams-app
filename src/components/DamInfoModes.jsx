"use client";

import { useState } from "react";
import ChartsList from "@/components/tables/ChartsList";
import AdvancedInfo from "@/components/AdvancedInfo";
import DamComparison from "./DamComparison";

const DamInfoModes = ({ months }) => {
  const [tab, setTab] = useState("comparison");

  return (
    <div>
      <div className="flex gap-3">
        <button
          className={`${
            tab === "simple"
              ? "bg-sky-500 text-white border-sky-500 font-medium"
              : "bg-gray-200 border-gray-300 text-gray-700"
          } h-full border px-4 py-2 rounded-t-lg`}
          type="button"
          onClick={() => setTab("simple")}
        >
          Simple Mode
        </button>
        <button
          className={`${
            tab === "advanced"
              ? "bg-sky-500 text-white border-sky-500 font-medium"
              : "bg-gray-200 border-gray-300 text-gray-700"
          } h-full border px-4 py-2 rounded-t-lg`}
          type="button"
          onClick={() => setTab("advanced")}
        >
          Advanced Mode
        </button>
        <button
          className={`${
            tab === "comparison"
              ? "bg-sky-500 text-white border-sky-500 font-medium"
              : "bg-gray-200 border-gray-300 text-gray-700"
          } h-full border px-4 py-2 rounded-t-lg`}
          type="button"
          onClick={() => setTab("comparison")}
        >
          Comparison Mode
        </button>
      </div>
      <div className="border border-t-2 border-t-sky-500">
        {tab === "simple" ? (
          <ChartsList months={months} />
        ) : tab === "advanced" ? (
          <AdvancedInfo months={months} />
        ) : (
          <DamComparison months={months} />
        )}
      </div>
    </div>
  );
};

export default DamInfoModes;
