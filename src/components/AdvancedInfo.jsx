import { useEffect, useState } from "react";
import ComparisonLineChart from "./charts/ComparisonLineChart";
import ComparisonTable from "./tables/ComparisonTable";
import parameters from "@/data/parameters.json";

const AdvancedInfo = ({ months }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [viewMode, setViewMode] = useState("graph");

  const handleRowClick = (paramId) => {
    if (selectedRows.includes(paramId)) {
      setSelectedRows(selectedRows.filter((id) => id !== paramId));
    } else {
      setSelectedRows([...selectedRows, paramId]);
    }
  };

  const handleSelectAll = () => {
    const allIds = parameters.map((param) => param.id);
    setSelectedRows(allIds);
  };

  const handleUnselectAll = () => {
    setSelectedRows([]);
  };

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="p-2 flex gap-4">
      <div className="w-2/6">
        <div className="flex gap-2 mb-4">
          <button
            className="text-sky-500 border px-3 py-1 rounded-lg hover:bg-sky-500 hover:text-white transition"
            type="button"
            onClick={handleSelectAll}
          >
            Select All
          </button>
          <button
            className="text-sky-500 border px-3 py-1 rounded-lg hover:bg-sky-500 hover:text-white transition"
            type="button"
            onClick={handleUnselectAll}
          >
            Unselect All
          </button>
          <select className="text-sky-500 border px-2 py-1 rounded-lg hover:bg-sky-500 hover:text-white transition">
            <option value="2019">2019</option>
          </select>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Parameter</th>
              <th>Parameter Shortname</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            {parameters.map((param) => (
              <tr
                key={param.id}
                onClick={() => handleRowClick(param.id)} // Select on click
                className={`hover:bg-gray-100 ${
                  selectedRows.includes(param.id) ? "bg-base-200" : ""
                } hover:cursor-pointer`}
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    className="hover:cursor-pointer"
                    checked={selectedRows.includes(param.id)}
                    readOnly
                  />
                </td>
                <td className="px-4 py-2">{param.name}</td>
                <td className="px-4 py-2">{param.shortname}</td>
                <td className="px-4 py-2">{param.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-4/6 flex flex-col">
        <div className="flex gap-2 mb-4">
          <button
            className={`text-sky-500 border px-3 py-1 rounded-lg hover:bg-sky-500 hover:text-white transition ${
              viewMode === "graph" ? "bg-sky-500 text-white" : ""
            }`}
            type="button"
            onClick={() => toggleViewMode("graph")}
          >
            Graph View
          </button>
          <button
            className={`text-sky-500 border px-3 py-1 rounded-lg hover:bg-sky-500 hover:text-white transition ${
              viewMode === "table" ? "bg-sky-500 text-white" : ""
            }`}
            type="button"
            onClick={() => toggleViewMode("table")}
          >
            Table View
          </button>
        </div>
        <div className="grow flex justify-center items-center">
          {/* Conditional rendering based on view mode */}
          {viewMode === "graph" &&
            months &&
            (selectedRows.length ? (
              <ComparisonLineChart
                selectedRows={selectedRows}
                months={months}
              />
            ) : (
              <p className="p-5 border border-sky-500">
                Please select one or more parameters to view results
              </p>
            ))}
          {viewMode === "table" &&
            months &&
            (selectedRows.length ? (
              <ComparisonTable selectedRows={selectedRows} months={months} />
            ) : (
              <p className="p-5 border border-sky-500">
                Please select one or more parameters to view results
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedInfo;
