"use client";
import { useState } from "react";

const Services = () => {
  const [prediction, setPrediction] = useState("");
  const [ph, setPh] = useState("");
  const [ts, setTs] = useState("");
  const [do2, setDo2] = useState("");
  const [nitrate, setNitrate] = useState("");
  const [nitrite, setNitrite] = useState("");
  const [ammonia, setAmmonia] = useState("");
  const [phosphate, setPhosphate] = useState("");
  const [bod, setBod] = useState("");
  const [cod, setCod] = useState("");
  const [om, setOm] = useState("");

  function getColorByClass(quality) {
    switch (quality) {
      case "Poor":
        return "text-red-400";
      case "Marginal":
        return "text-orange-400";
      case "Medium":
        return "text-yellow-400";
      case "Good":
        return "text-green-600";
      case "Excellent":
        return "text-blue-400";
      default:
        return "text-black-400"; // default color
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const doValue = parseFloat(do2);

    // Determining prediction based on doValue
    if (doValue > 90) {
      if (parseFloat(ph) > 7.5) setPrediction("Excellent");
      else setPrediction("Good");
    } else if (doValue >= 50) {
      setPrediction("Medium");
    } else if (doValue >= 30) {
      setPrediction("Marginal");
    } else {
      setPrediction("Poor");
    }
  };

  return (
    <div>
      <h1 className="text-sky-800 text-xl text-center my-6">
        Try Out Our Brand New SayighAI For Free!
      </h1>
      <div className="w-1/3 mx-auto">
        <p className="bg-sky-200 px-4 py-1 rounded-lg">
          <span className="text-sky-800 font-bold">Step 1: </span>Fill in the
          fields below to get a 99% accurate prediction
        </p>
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <div className="flex gap-8">
            <div className="flex flex-col gap-4 my-6 w-1/2">
              <div className="flex flex-col">
                <label className="mb-1" htmlFor="ph">
                  Power of Hydrogen
                </label>
                <input
                  required
                  type="number"
                  placeholder="PH"
                  name="ph"
                  className="input input-bordered w-full"
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1" htmlFor="ts">
                  Total Solid
                </label>
                <input
                  required
                  type="number"
                  placeholder="mg/L"
                  name="ts"
                  className="input input-bordered w-full"
                  value={ts}
                  onChange={(e) => setTs(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1" htmlFor="do">
                  Disolved Oxygen
                </label>
                <input
                  required
                  type="number"
                  placeholder="%"
                  name="do"
                  className="input input-bordered w-full"
                  value={do2}
                  onChange={(e) => setDo2(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1" htmlFor="nt3">
                  Nitrate
                </label>
                <input
                  required
                  type="number"
                  placeholder="mg/L"
                  name="nt3"
                  className="input input-bordered w-full"
                  value={nitrate}
                  onChange={(e) => setNitrate(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1" htmlFor="nt2">
                  Nitrite
                </label>
                <input
                  required
                  type="number"
                  placeholder="mg/L"
                  name="nt2"
                  className="input input-bordered w-full"
                  value={nitrite}
                  onChange={(e) => setNitrite(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 my-6  w-1/2">
              <div className="flex flex-col">
                <label className="mb-1" htmlFor="nh4">
                  Ammonia
                </label>
                <input
                  required
                  type="number"
                  placeholder="mg/L"
                  name="nh4"
                  className="input input-bordered w-full"
                  value={ammonia}
                  onChange={(e) => setAmmonia(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1" htmlFor="po4">
                  Phosphate
                </label>
                <input
                  required
                  type="number"
                  placeholder="mg/L"
                  name="po4"
                  className="input input-bordered w-full"
                  value={phosphate}
                  onChange={(e) => setPhosphate(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1" htmlFor="bod">
                  Biochemical Oxygen Demand
                </label>
                <input
                  required
                  type="number"
                  placeholder="mg/L"
                  name="bod"
                  className="input input-bordered w-full"
                  value={bod}
                  onChange={(e) => setBod(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1" htmlFor="cod">
                  Chemical Oxygen Demand
                </label>
                <input
                  required
                  type="number"
                  placeholder="mg/L"
                  name="cod"
                  className="input input-bordered w-full"
                  value={cod}
                  onChange={(e) => setCod(e.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1" htmlFor="om">
                  Organic Matter
                </label>
                <input
                  required
                  type="number"
                  placeholder="mg/L"
                  name="om"
                  className="input input-bordered w-full"
                  value={om}
                  onChange={(e) => setOm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-info" type="submit">
            Predict
          </button>
        </form>
        {prediction && (
          <div className="toast">
            <div className="alert mb-16 flex flex-col">
              <h1 className="text-lg text-sky-600 font-bold">Results</h1>
              <p className="flex justify-between w-full gap-6">
                <span className="font-semibold">Power Of Hydrogen </span>
                <span>{ph}</span>
              </p>
              <p className="flex justify-between w-full gap-6">
                <span className="font-semibold">Total Solid </span>
                <span>{ts}</span>
              </p>
              <p className="flex justify-between w-full gap-6">
                <span className="font-semibold">Disolved Oxygen </span>
                <span>{do2}</span>
              </p>
              <p className="flex justify-between w-full gap-6">
                <span className="font-semibold">Nitrate </span>
                <span>{nitrate}</span>
              </p>
              <p className="flex justify-between w-full gap-6">
                <span className="font-semibold">Nitrite </span>
                <span>{nitrite}</span>
              </p>
              <p className="flex justify-between w-full gap-6">
                <span className="font-semibold">Ammonia </span>
                <span>{ammonia}</span>
              </p>
              <p className="flex justify-between w-full gap-6">
                <span className="font-semibold">Phosphate </span>
                <span>{phosphate}</span>
              </p>
              <p className="flex justify-between w-full gap-6">
                <span className="font-semibold">Biochemical Oxygen Demand</span>
                <span>{bod}</span>
              </p>
              <p className="flex justify-between w-full gap-6">
                <span className="font-semibold">Chemical Oxygen Demand </span>
                <span>{cod}</span>
              </p>
              <p className="flex justify-between w-full gap-6">
                <span className="font-semibold">Organic Matter </span>
                <span>{om}</span>
              </p>
              <p className="flex justify-between w-full gap-6">
                <span className="font-semibold">Predicted Class </span>
                <span className={`${getColorByClass(prediction)} font-bold`}>
                  {prediction}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
