import React, { useState } from 'react';

function Sorting({ categories, onSort, todayToggle, todayStatus, selectedCategory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const todayText = todayStatus === 'today' ? "Previous Posts" : "Today's Posts";

  const handleSearch = (event) => {
    event.preventDefault();
    onSort({ search: searchTerm });
  };

  return (
    <div className="my-4">
      <div className="flex flex-wrap justify-center items-center mb-4">
        <button
          onClick={todayToggle}
          className={`mx-2 my-2 py-2 px-4 rounded-lg ${todayStatus === 'today' ? 'bg-blue-500' : 'bg-gray-200'} text-lg`}
        >
          {todayText}
        </button>
        <button
          onClick={() => onSort({ category: 'all' })}
          className={`mx-2 my-2 py-2 px-4 rounded-lg ${selectedCategory === 'all' ? 'bg-green-500' : 'bg-gray-200'} text-lg`}
        >
          All
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onSort({ category })}
            className={`mx-2 my-2 py-2 px-4 rounded-lg ${selectedCategory === category ? 'bg-green-500' : 'bg-gray-200'} text-lg`}
          >
            {category}
          </button>
        ))}
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
  );
}

export default Sorting;
