import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing the search icon from React Icons

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative w-full sm:w-auto ">
      <input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded-4xl  p-2 pl-10 w-full sm:w-96 shadow text-sm sm:text-base"
      />
      {/* Search Icon inside the input */}
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <FaSearch className="h-5 w-5 text-gray-500" />
      </div>
    </div>
  );
};

export default SearchBar;
