import React from "react";
import { FaSearch } from "react-icons/fa";

import "./index.css";

export default function Search() {
  return (
    <div className="relative">
      <input type="text" className="" placeholder="Search..." />
      <button className="absolute right-1 px-3 py-3 text-light-gray hover:text-primary">
        <FaSearch />
      </button>
    </div>
  );
}
