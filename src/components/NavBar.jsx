"use client";

import Link from "next/link";
import YouTube from "react-youtube";

const Navbar = () => {
  return (
    <nav className="bg-sky-600 px-32">
      <div className="flex justify-between items-center">
        <Link className="h-24" href="/">
          <img className="max-h-full" src="/logo sm.png" alt="logo" />
        </Link>
        <div className="flex items-center gap-16">
          <ul className="flex gap-10">
            <li className="text-white font-medium relative group">
              <Link href="/">Home</Link>
              <span className="absolute w-full h-0.5 bg-white bottom-0 left-0 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
            </li>
            <li className="text-white font-medium relative group">
              <Link href="/dashboard">Dashboard</Link>
              <span className="absolute w-full h-0.5 bg-white bottom-0 left-0 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
            </li>
            <li className="text-white font-medium relative group">
              <Link href="/services">Services</Link>
              <span className="absolute w-full h-0.5 bg-white bottom-0 left-0 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
            </li>
            <li className="text-white font-medium relative group">
              <Link href="/dams">Dams</Link>
              <span className="absolute w-full h-0.5 bg-white bottom-0 left-0 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
            </li>
          </ul>
          <Link
            href="/#consultation-form"
            type="button"
            className="bg-white text-black px-6 py-3 rounded-full shadow-lg font-medium transition-colors hover:bg-sky-200"
          >
            BOOK CONSULTATION
          </Link>
          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            How To Use
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box max-w-none w-1/2 h-1/2">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg mb-4">
                Watch this video to get familiar with the website!
              </h3>
              <div className="mx-auto size-fit">
                <YouTube className="w-full h-full" videoId="GJXyFw9bS28" />
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
