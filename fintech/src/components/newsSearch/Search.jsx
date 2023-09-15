import React, { useState } from "react";
import axios from "axios";

const Search = ({ onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const apikey = process.env.REACT_APP_SECRET_KEY;

  const handleClick = () => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${searchText}&from=2023-08-13&sortBy=publishedAt&apiKey=${apikey}&language=ko`
      )
      .then((res) => {
        onSearch(res.data.articles);
      });
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <input type="text" value={searchText} onChange={handleInputChange} />
      <button onClick={handleClick}>검색</button>
    </div>
  );
};

export default Search;
