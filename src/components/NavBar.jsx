"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-sky-600 h-20">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link className="h-20" href="/">
            <img className="w-full h-full" src="/logo.png" alt="logo" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
