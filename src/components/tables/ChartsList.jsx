import LineChart from "@/components/charts/LineChart";
import { formatDate } from "@/utils/formatDate";

const ChartsList = ({ months }) => {
  return (
    <div>
      {Object.keys(months[0])
        .filter((attribute) => attribute !== "dam_id" && attribute !== "month")
        .map((attribute, index, array) => (
          <div
            className={`collapse collapse-arrow bg-gray-50 rounded-none ${
              index !== array.length - 1 ? "border-b" : "" // Apply border except for the last item
            }`}
            key={attribute}
          >
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              {attribute}
            </div>
            <div className="collapse-content flex justify-center">
              <LineChart
                data={months.map((month) => month[attribute])}
                months={months.map((month) => formatDate(month.month))}
                attribute={attribute}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChartsList;
