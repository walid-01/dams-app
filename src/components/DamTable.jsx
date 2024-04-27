"use client";

const DamTable = ({ data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">WQI</th>
            <th className="px-4 py-2">Order</th>
            <th className="px-4 py-2">Class</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Narrative</th>
            <th className="px-4 py-2">Open Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dam) => (
            <tr
              key={dam.id}
              onClick={() => {
                window.location.href = `/dam/${dam.id}`;
              }}
              className="border-2 hover:border-gray-400 hover:cursor-pointer"
            >
              <td className="px-4 py-2">{dam.id}</td>
              <td className="px-4 py-2">{dam.wqi}</td>
              <td className="px-4 py-2">{dam.order}</td>
              <td className="px-4 py-2">{dam.class}</td>
              <td className="px-4 py-2">{dam.name}</td>
              <td className="px-4 py-2">{dam.narrative}</td>
              <td className="px-4 py-2">{dam.openDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DamTable;
