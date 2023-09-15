import React, { useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import Search from "../components/newsSearch/Search";
import Result from "../components/newsSearch/Result";

const NewsSearch = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <HeaderComponent />
      <Search onSearch={handleSearch} />
      <Result articles={searchResults} />
    </div>
  );
};

export default NewsSearch;
