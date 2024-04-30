"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-sky-600">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link className="h-24" href="/">
            <img className="max-h-full" src="/logo sm.png" alt="logo" />
          </Link>
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
            <li className="text-white font-medium relative group">
              <Link href="/about">About</Link>
              <span className="absolute w-full h-0.5 bg-white bottom-0 left-0 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
