import React from "react";

function Search({search, onSearchChange}) {

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        autoComplete="off"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default Search;
