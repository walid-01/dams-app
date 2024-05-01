import React, { useEffect, useState } from "react";
import supabase from "@/config/supabase/supabase";

const DamTable = () => {
  const [fetchError, setFetchError] = useState(null);
  const [dams, setDams] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchDams = async () => {
      const { data, error } = await supabase.from("Dams").select();

      if (error) {
        setFetchError(error);
        return;
      }

      setFetchError(null);
      setDams(data);
    };

    fetchDams();
  }, []);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedDams = dams
    ? [...dams].sort((a, b) => {
        if (sortColumn) {
          if (sortColumn === "wqi" || sortColumn === "capacity") {
            // Flip comparison for "WQI" and "Capacity" columns
            if (a[sortColumn] < b[sortColumn]) {
              return sortDirection === "asc" ? 1 : -1;
            }
            if (a[sortColumn] > b[sortColumn]) {
              return sortDirection === "asc" ? -1 : 1;
            }
          } else {
            // Default comparison for other columns
            if (a[sortColumn] < b[sortColumn]) {
              return sortDirection === "asc" ? -1 : 1;
            }
            if (a[sortColumn] > b[sortColumn]) {
              return sortDirection === "asc" ? 1 : -1;
            }
          }
        }
        return 0;
      })
    : null;

  if (fetchError) {
    if (fetchError.code === "PGRST116") return notFound();
    return <p>{fetchError.details}</p>;
  }

  return (
    <div>
      {sortedDams && (
        <table>
          <thead>
            <tr>
              <SortableHeader
                column="id"
                title="ID"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              <SortableHeader
                column="wqi"
                title="WQI"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              <SortableHeader
                column="order"
                title="Order"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              <SortableHeader
                column="class"
                title="Class"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              <SortableHeader
                column="name"
                title="Name"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              <SortableHeader
                column="narrative"
                title="Narrative"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              <SortableHeader
                column="region"
                title="Region"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              <SortableHeader
                column="usage"
                title="Usage"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
              <SortableHeader
                column="capacity"
                title="Capacity"
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleSort={handleSort}
              />
            </tr>
          </thead>
          <tbody>
            {sortedDams.map((dam) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const SortableHeader = ({
  column,
  title,
  sortColumn,
  sortDirection,
  handleSort,
}) => {
  const handleClick = () => {
    handleSort(column);
  };

  return (
    <th
      className="px-4 py-2 cursor-pointer"
      onClick={handleClick}
      style={{ position: "relative" }}
    >
      {title}
      {sortColumn === column && (
        <span
          style={{
            position: "absolute",
            marginLeft: "5px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {sortDirection === "asc" ? "▲" : "▼"}
        </span>
      )}
    </th>
  );
};

export default DamTable;
