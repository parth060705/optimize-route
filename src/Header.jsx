import React from "react";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="flex bg-[#6b21a8] justify-between items-center px-8 py-2 top-0 w-full z-50 shadow-md gap-0.5">
      <div className="text-2xl tracking-[1px] font-bold">🚚RouteOptimization</div>

      <ul>
        <li className="flex gap-3">
          <Link className="text-white font-medium hover:opacity-80 hover:font-bold" to="/home">Home</Link>
          {/* <Link className="text-white font-medium hover:opacity-80 hover:font-bold" to="/login">login</Link>
          <Link className="text-white font-medium hover:opacity-80 hover:font-bold" to="/register">Register</Link> */}
        </li>
      </ul>

    </nav>
  );
};

export default Header;