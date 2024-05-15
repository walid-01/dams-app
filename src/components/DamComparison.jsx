import { useState } from "react";
import ComparisonLineChart from "./charts/ComparisonLineChart";

const DamComparison = ({ months }) => {
  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [parameters, setParameters] = useState([
    {
      id: "volume",
      name: "Volume",
      shortname: "Volume",
      unit: "Hm3",
    },
    {
      id: "ph",
      name: "Power of Hydrogen",
      shortname: "ph",
    },
    {
      id: "rs",
      name: "Total Solid",
      shortname: "TS",
      unit: "mg/L",
    },
    {
      id: "o2d",
      name: "Disolved Oxygen",
      shortname: "DO",
      unit: "%",
    },
    {
      id: "no3",
      name: "Nitrate",
      shortname: "NO3-",
      unit: "mg/L",
    },
    {
      id: "no2",
      name: "Nitrite",
      shortname: "NO2-",
      unit: "mg/L",
    },
    {
      id: "nh4",
      name: "Ammonia",
      shortname: "NH4+",
      unit: "mg/L",
    },
    {
      id: "po4",
      name: "Phosphate",
      shortname: "PO4-3",
      unit: "mg/L",
    },
    {
      id: "dbo5",
      name: "Biochemical Oxygen Demand",
      shortname: "BOD",
      unit: "mg/L",
    },
    {
      id: "dco",
      name: "Chemical Oxygen Demand",
      shortname: "COD",
      unit: "mg/L",
    },
    {
      id: "mo",
      name: "Organic Matter",
      shortname: "OM",
      unit: "mg/L",
    },
  ]);

  // useEffect(() => {
  //   console.log(parameters);
  // }, [parameters]);

  return (
    <div className="p-8 flex flex-col gap-10 items-center">
      <div className="w-1/2 flex flex-col gap-4">
        <p className="bg-sky-200 px-4 py-1 rounded-lg">
          <span className="text-sky-800 font-bold">Step 1: </span>Choose a Dam
          to compare with
        </p>
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div class="overflow-x-auto h-96 border">
          <table class="table table-pin-rows">
            <tbody>
              <tr>
                <td>Ant-Man</td>
              </tr>
              <tr>
                <td>Aquaman</td>
              </tr>
              <tr>
                <td>Asterix</td>
              </tr>
              <tr>
                <td>The Atom</td>
              </tr>
              <tr>
                <td>The Avengers</td>
              </tr>
              <tr>
                <td>Batgirl</td>
              </tr>
              <tr>
                <td>Batman</td>
              </tr>
              <tr>
                <td>Batwoman</td>
              </tr>
              <tr>
                <td>Black Canary</td>
              </tr>
              <tr>
                <td>Black Panther</td>
              </tr>
              <tr>
                <td>Captain America</td>
              </tr>
              <tr>
                <td>Captain Marvel</td>
              </tr>
              <tr>
                <td>Catwoman</td>
              </tr>
              <tr>
                <td>Conan the Barbarian</td>
              </tr>
              <tr>
                <td>Daredevil</td>
              </tr>
              <tr>
                <td>The Defenders</td>
              </tr>
              <tr>
                <td>Doc Savage</td>
              </tr>
              <tr>
                <td>Doctor Strange</td>
              </tr>
              <tr>
                <td>Elektra</td>
              </tr>
              <tr>
                <td>Fantastic Four</td>
              </tr>
              <tr>
                <td>Ghost Rider</td>
              </tr>
              <tr>
                <td>Green Arrow</td>
              </tr>
              <tr>
                <td>Green Lantern</td>
              </tr>
              <tr>
                <td>Guardians of the Galaxy</td>
              </tr>
              <tr>
                <td>Hawkeye</td>
              </tr>
              <tr>
                <td>Hellboy</td>
              </tr>
              <tr>
                <td>Incredible Hulk</td>
              </tr>
              <tr>
                <td>Iron Fist</td>
              </tr>
              <tr>
                <td>Iron Man</td>
              </tr>
              <tr>
                <td>Marvelman</td>
              </tr>
              <tr>
                <td>Robin</td>
              </tr>
              <tr>
                <td>The Rocketeer</td>
              </tr>
              <tr>
                <td>The Shadow</td>
              </tr>
              <tr>
                <td>Spider-Man</td>
              </tr>
              <tr>
                <td>Sub-Mariner</td>
              </tr>
              <tr>
                <td>Supergirl</td>
              </tr>
              <tr>
                <td>Superman</td>
              </tr>
              <tr>
                <td>Teenage Mutant Ninja Turtles</td>
              </tr>
              <tr>
                <td>Thor</td>
              </tr>
              <tr>
                <td>The Wasp</td>
              </tr>
              <tr>
                <td>Watchmen</td>
              </tr>
              <tr>
                <td>Wolverine</td>
              </tr>
              <tr>
                <td>Wonder Woman</td>
              </tr>
              <tr>
                <td>X-Men</td>
              </tr>
              <tr>
                <td>Zatanna</td>
              </tr>
              <tr>
                <td>Zatara</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        <p className="bg-sky-200 px-4 py-1 rounded-lg">
          <span className="text-sky-800 font-bold">Step 2: </span>Choose a
          comparison parameter
        </p>
        <div>
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
                onClick={() => setSelectedAttribute(param.id)} // Select on click
                className={`hover:bg-gray-100 ${
                  selectedAttribute === param.id ? "bg-base-200" : ""
                } hover:cursor-pointer`}
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    className="checkbox hover:cursor-pointer"
                    checked={selectedAttribute === param.id}
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
      {/* <div className="w-1/2 flex flex-col">
        <div className="grow flex justify-center items-center">
          {months &&
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
        </div>
      </div> */}
    </div>
  );
};

export default DamComparison;
