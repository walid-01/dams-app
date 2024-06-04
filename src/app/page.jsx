"use client";

import { useState } from "react";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactContent, setContactContent] = useState("");

  const handleClick = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setOrganization("");
    setJobTitle("");
    setPhoneNumber("");
    setContactContent("");
  };
  return (
    <div>
      <div className="flex py-20 px-56 gap-32">
        <div className="w-1/2 flex flex-col justify-center items-start gap-4">
          <p className="font-thin">WATER DATA MANAGEMENT SOFTWARE</p>
          <div>
            <h1 className="text-3xl text-gray-700">One Water.</h1>
            <h1 className="text-3xl text-gray-700">One Platform.</h1>
          </div>
          <p className="font-medium text-gray-700">
            The world's most advanced water organizations trust Aquatic
            Informatics to achieve higher data integrity, defensibility,
            compliance, timeliness, and reporting.
          </p>
          <button
            type="button"
            className="bg-sky-600 px-6 py-3 rounded-full text-white font-medium transition-colors hover:bg-sky-700"
          >
            BOOK CONSULTATION
          </button>
        </div>
        <div className="w-1/2 flex justify-center">
          <div className="m-auto">
            <img src="home-hero.png" alt="hero" />
          </div>
        </div>
      </div>
      <div className="flex px-56 py-20 flex-col gap-8 bg-sky-100">
        <div>
          <h1 className="text-3xl text-sky-700 mb-4">The Platform</h1>
          <p>
            From source water through to the receiving environment, our
            interconnected data management platforms drive the efficient
            management of water information across the water cycle to protect
            human health and reduce environmental impact.
          </p>
        </div>
        <div className="flex gap-10">
          <div className="bg-white shadow-lg rounded-lg w-1/3 px-6 py-5">
            <h2 className="text-lg text-sky-700 font-medium">
              Integrate data sources.
            </h2>
            <p>
              Consolidate disparate data sources and systems into a unified
              platform for efficient management.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg w-1/3 px-6 py-5">
            <h2 className="text-lg text-sky-700 font-medium">
              Defensible analytics and reporting.
            </h2>
            <p>
              Easily display and correct integrated data sources for compliance
              reporting with a defensible audit trail.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg w-1/3 px-6 py-5">
            <h2 className="text-lg text-sky-700 font-medium">
              Predict and distribute insights.
            </h2>
            <p>
              Make faster decisions with real-time insights, powerful contextual
              visualization tools, and interactive online access for consumers.
            </p>
          </div>
        </div>
      </div>
      <div className="flex px-56 py-20 flex-col gap-8">
        <div className="card lg:card-side bg-base-100 shadow-xl">
          <figure>
            <img src="beni-haroun-sm.png" alt="Album" />
          </figure>
          <div className="card-body w-2/5">
            <h2 className="card-title text-3xl text-sky-700 mb-4">
              Contact Us
            </h2>
            <div>
              <p>Book a Free Consultation Unlock better,</p>
              <p>faster decision-making—let us show you how.</p>
            </div>
            <form className="flex flex-col gap-4">
              <div className="flex gap-4">
                <input
                  className="border rounded-md px-2 py-1 border-sky-500 w-1/2"
                  type="text"
                  placeholder="Firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <input
                  className="border rounded-md px-2 py-1 border-sky-500 w-1/2"
                  type="text"
                  placeholder="Lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <input
                className="border rounded-md px-2 py-1 border-sky-500 w-full"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="flex gap-4">
                <input
                  className="border rounded-md px-2 py-1 border-sky-500 w-1/2"
                  type="text"
                  placeholder="Organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  required
                />
                <input
                  className="border rounded-md px-2 py-1 border-sky-500 w-1/2"
                  type="text"
                  placeholder="Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <input
                className="border rounded-md px-2 py-1 border-sky-500 w-full"
                type="tel"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <textarea
                className="border rounded-md px-2 py-1 border-sky-500 w-full h-32"
                name="contact-content"
                placeholder="Please briefly describe your case and what do you exactly need help for"
                value={contactContent}
                onChange={(e) => setContactContent(e.target.value)}
              />
            </form>
            <div className="form-control">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-info mr-4"
                />
                <span className="label-text">
                  I give Sayigh Informatics permission to provide me with
                  information about their products and services.
                </span>
              </label>
              <p className="text-xs">
                By submitting, I confirm that I have reviewed and agree with the
                Aquatic Informatics' Privacy Policy, including my personal data
                privacy choices as outlined in the “Your Privacy Choices”
                section.
              </p>
            </div>
            <div className="card-actions justify-end">
              <button
                className="btn bg-sky-500 hover:bg-sky-500"
                onClick={handleClick}
              >
                Request Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
