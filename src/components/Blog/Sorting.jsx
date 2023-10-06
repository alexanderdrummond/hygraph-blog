import React, { useState } from 'react';

function Sorting({ categories, onSort, todayToggle, todayStatus, selectedCategory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInputActive, setInputActive] = useState(false);
  const todayText = todayStatus === 'today' ? "Show All" : "Show Today";

  const handleSearch = (event) => {
    event.preventDefault();
    onSort({ search: searchTerm });
  };

  return (
    <div className="my-4 text-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button
            onClick={todayToggle}
            className={`mx-2 py-1 px-3 rounded-lg text-base transition duration-300 ease-in-out ${todayStatus === 'today' ? 'bg-amber-600 text-white' : 'bg-gray-600'}`}
          >
            {todayText}
          </button>
          <div className="border-r-2 border-gray-500 h-5 mx-3"></div>
          <div className="flex space-x-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  if (selectedCategory === category) {
                    onSort({ category: 'all' });
                  } else {
                    onSort({ category });
                  }
                }}
                className={`py-1 px-3 rounded-lg text-base transition duration-300 ease-in-out ${selectedCategory === category ? 'bg-amber-600 text-white' : 'bg-gray-600'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <select
            onChange={(e) => onSort({ orderBy: e.target.value })}
            className="py-1 px-3 rounded-lg border border-gray-500 text-base mx-2 transition duration-300 ease-in-out hover:border-gray-400 bg-gray-600"
            defaultValue="title"
          >
            <option value="title">Sort by Title</option>
            <option value="published">Sort by Date</option>
          </select>
          <form onSubmit={handleSearch} className="mx-2 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setInputActive(true)}
              onBlur={() => setInputActive(false)}
              className="py-1 px-3 rounded-lg border border-gray-500 text-base transition duration-300 ease-in-out hover:border-gray-400 pr-8 bg-gray-600"
              placeholder="Search title"
            />
            {!isInputActive && (
              <div className="absolute inset-y-0 right-3 h-4 w-4 top-1/2 transform -translate-y-1/2 cursor-pointer">
                
                <img src="/search.svg" alt="search" className="h-4 w-4" style={{ filter: 'invert(75%)' }} />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sorting;
