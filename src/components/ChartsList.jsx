import LineChart from "@/components/LineChart";
import { formatDate } from "@/utils/formatDate";
import { useState } from "react";

const ChartsList = ({ months }) => {
  const [openCharts, setOpenCharts] = useState({});

  const toggleChart = (attribute) => {
    setOpenCharts((prevOpenCharts) => ({
      ...prevOpenCharts,
      [attribute]: !prevOpenCharts[attribute],
    }));
  };

  return (
    <div>
      {Object.keys(months[0])
        .filter((attribute) => attribute !== "dam_id" && attribute !== "month")
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
                  months={months.map((month) => formatDate(month.month))}
                  attribute={attribute}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChartsList;
