import React from "react";

const Services = () => {
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
        <form className="flex flex-col gap-4 my-6">
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="ph">
              Power of Hydrogen
            </label>
            <input
              type="number"
              placeholder="PH"
              name="ph"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="ts">
              Total Solid
            </label>
            <input
              type="number"
              placeholder="mg/L"
              name="ts"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="do">
              Disolved Oxygen
            </label>
            <input
              type="number"
              placeholder="%"
              name="do"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="nt3">
              Nitrate
            </label>
            <input
              type="number"
              placeholder="mg/L"
              name="nt3"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="nt2">
              Nitrite
            </label>
            <input
              type="number"
              placeholder="mg/L"
              name="nt2"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="nh4">
              Ammonia
            </label>
            <input
              type="number"
              placeholder="mg/L"
              name="nh4"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="po4">
              Phosphate
            </label>
            <input
              type="number"
              placeholder="mg/L"
              name="po4"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="bod">
              Biochemical Oxygen Demand
            </label>
            <input
              type="number"
              placeholder="mg/L"
              name="bod"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="cod">
              Chemical Oxygen Demand
            </label>
            <input
              type="number"
              placeholder="mg/L"
              name="cod"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="om">
              Organic Matter
            </label>
            <input
              type="number"
              placeholder="mg/L"
              name="om"
              className="input input-bordered w-full"
            />
          </div>
          <button className="btn btn-info" type="button">
            Predict
          </button>
        </form>
      </div>
    </div>
  );
};

export default Services;
