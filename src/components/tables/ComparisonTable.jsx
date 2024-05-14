import { formatDate } from "@/utils/formatDate";

const ComparisonTable = ({ selectedRows, months }) => {
  return (
    <div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Month</th>
            {selectedRows.map((paramId) => (
              <th key={paramId}>{paramId}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {months.map((month) => (
            <tr key={month.month}>
              <td className="px-6 py-2">{formatDate(month.month)}</td>
              {selectedRows.map((paramId) => (
                <td className="px-6" key={paramId}>
                  {month[paramId]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
