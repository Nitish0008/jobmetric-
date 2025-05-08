import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <div className="flex justify-center items-center mt-10 mb-4 px-4">
      <div className="flex items-center gap-2 w-full max-w-md bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-2xl">
        <FaSearch className="text-blue-800 text-lg" />
        <input
          type="text"
          placeholder="Search job here"
          className="flex-grow outline-none text-black bg-transparent"
        />
        
      </div>
      <button className="bg-blue-500 text-white px-4 py-3 m-2 rounded-md hover:bg-blue-600 transition cursor-pointer">
          Find Job
        </button>
    </div>
  );
}
