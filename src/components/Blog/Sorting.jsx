import React, { useState } from 'react';

function Sorting({ categories, onSort, todayToggle, todayStatus, selectedCategory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const todayText = todayStatus === 'today' ? "Show All News" : "Show Today's News";

  const handleSearch = (event) => {
    event.preventDefault();
    onSort({ search: searchTerm });
  };

  return (
    <div className="my-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <button
            onClick={todayToggle}
            className={`mx-2 my-2 py-2 px-4 rounded-lg ${todayStatus === 'today' ? 'bg-blue-500 text-white' : 'bg-gray-200'} text-lg`}
          >
            {todayText}
          </button>
          <div className="border-r-2 border-gray-400 h-6 mx-3"></div>
          <div className="flex">
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
              className={`mx-2 my-2 py-2 px-4 rounded-lg text-lg transition duration-300 ease-in-out ${selectedCategory === category ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {category}
            </button>
            
            ))}
          </div>
        </div>

        <div className="flex">
          <select
            onChange={(e) => onSort({ orderBy: e.target.value })}
            className="py-2 px-4 rounded-lg border border-gray-300 text-lg mx-2 my-2"
            defaultValue="title"
          >
            <option value="title">Sort by Title</option>
            <option value="published">Sort by Published Date</option>
          </select>
          <form onSubmit={handleSearch} className="mx-2 my-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2 px-4 rounded-lg border border-gray-300 text-lg"
              placeholder="Search by title"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Sorting;
