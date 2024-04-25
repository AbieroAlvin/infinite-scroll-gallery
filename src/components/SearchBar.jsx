const SearchBar = ({ searchQuery, handleSearch }) => {
  return (
    <div className="mb-4 w-full">
      {/* <input
        type="text"
        placeholder="Search images..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      /> */}

      <input
        type="text"
        placeholder="Search images..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full  px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
