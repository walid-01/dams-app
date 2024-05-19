import { useEffect, useState } from "react";
import ComparisonLineChart from "./charts/ComparisonLineChart";
import useDam from "@/hooks/useDam";
import parameters from "@/data/parameters.json";
import DamComparisonLineChart from "./charts/DamComparisonLineChart";

const DamComparison = ({ months, damName }) => {
  const { fetchDams } = useDam();

  const [selectedAttribute, setSelectedAttribute] = useState("");
  const [selectedComparisonDam, setSelectedComparisonDam] = useState(null);
  const [dams, setDams] = useState([]);
  const [tableDams, setTableDams] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchDams();

      if (error) {
        setFetchError(error);
        return;
      }

      setFetchError(null);
      setDams(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Sort the dams alphabetically by name
    const sortedDams = dams.sort((a, b) => a.name.localeCompare(b.name));

    // Filter dams based on search query
    const filteredDams = sortedDams.filter((dam) =>
      dam.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group the sorted dams by the first letter of their name
    const groupedDams = filteredDams.reduce((acc, dam) => {
      const firstLetter = dam.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(dam);
      return acc;
    }, {});

    // Set the grouped data to the state
    setTableDams(groupedDams);
  }, [dams, searchQuery]);

  // useEffect(() => {
  //   console.log(selectedComparisonDam);
  // }, [selectedComparisonDam]);

  if (fetchError) {
    // Handle fetch error
    return <p>{fetchError.details}</p>;
  }

  return (
    <div className="w-1/2 m-8 flex flex-col gap-4 mx-auto items-stretch">
      {/* <ul className="steps">
        <li
          className={`step ${currentStep > 0 && "step-info"} ${
            currentStep === 1 && "font-bold text-sky-500"
          }`}
        >
          Choose a Dam
        </li>
        <li
          className={`step ${currentStep > 1 && "step-info"} ${
            currentStep === 2 && "font-bold text-sky-500"
          }`}
        >
          Choose Parameter
        </li>
        <li
          className={`step ${currentStep > 2 && "step-info"} ${
            currentStep === 3 && "font-bold text-sky-500"
          }`}
        >
          View Results
        </li>
      </ul> */}
      <ul className="steps">
        <li className={`step ${currentStep > 0 && "step-info"}`}></li>
        <li className={`step ${currentStep > 1 && "step-info"}`}></li>
        <li className={`step ${currentStep > 2 && "step-info"}`}></li>
      </ul>
      {currentStep === 1 && (
        <>
          {/* Step Info */}
          <p className="bg-sky-200 px-4 py-1 rounded-lg">
            <span className="text-sky-800 font-bold">Step 1: </span>Choose a Dam
            to compare with
          </p>

          {/* Search Bar */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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

          {/* Table */}
          <div className="flex justify-center">
            <div className="w-full overflow-x-auto h-96 border">
              {Object.entries(tableDams).map(([letter, dams]) => (
                <table key={letter} className="table table-pin-rows">
                  <thead>
                    <tr className="bg-gray-50">
                      <th>{letter}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dams
                      .filter((dam) => dam.name !== damName)
                      .map((dam) => (
                        <tr
                          key={dam.id}
                          onClick={() =>
                            selectedComparisonDam !== dam.id
                              ? setSelectedComparisonDam(dam.id)
                              : setSelectedComparisonDam(null)
                          } // Select on click
                          className={`hover:bg-gray-100 ${
                            selectedComparisonDam === dam.id ? "bg-gray-50" : ""
                          } hover:cursor-pointer`}
                        >
                          <td className="flex justify-between">
                            <p>{`${dam.id} - ${dam.name}`}</p>
                            <input
                              type="checkbox"
                              className="checkbox hover:cursor-pointer"
                              checked={selectedComparisonDam === dam.id}
                              readOnly
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="btn text-white bg-sky-500 hover:bg-sky-600"
              disabled={!selectedComparisonDam}
              onClick={() => setCurrentStep(2)}
            >
              Next
            </button>
          </div>
        </>
      )}
      {currentStep === 2 &&
        (!selectedComparisonDam ? (
          setCurrentStep(1)
        ) : (
          <>
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
                    onClick={() =>
                      selectedAttribute !== param.id
                        ? setSelectedAttribute(param.id)
                        : setSelectedAttribute(null)
                    }
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
            <div className="flex justify-between">
              <button
                className="btn text-white bg-sky-500 hover:bg-sky-600"
                // disabled={selectedComparisonDam}
                onClick={() => setCurrentStep(1)}
              >
                Previous
              </button>
              <button
                className="btn text-white bg-sky-500 hover:bg-sky-600"
                disabled={!selectedAttribute}
                onClick={() => setCurrentStep(3)}
              >
                Next
              </button>
            </div>
          </>
        ))}
      {currentStep === 3 && (
        <>
          <p className="bg-sky-200 px-4 py-1 rounded-lg">
            <span className="text-sky-800 font-bold">Step 3: </span>View Results
          </p>
          <div className="grow flex justify-center items-center">
            {months && (
              <DamComparisonLineChart
                selectedAttribute={selectedAttribute}
                currentDamData={months}
                damName={damName}
                comparisonDamId={selectedComparisonDam}
              />
            )}
          </div>
          <div>
            <button
              className="btn text-white bg-sky-500 hover:bg-sky-600"
              // disabled={selectedComparisonDam}
              onClick={() => setCurrentStep(2)}
            >
              Previous
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DamComparison;
