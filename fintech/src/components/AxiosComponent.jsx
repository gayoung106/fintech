import React from "react";
import axios from "axios";

const AxiosComponent = () => {
  const handleClick = () => {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=tesla&from=2023-08-13&sortBy=publishedAt&apiKey=61a7643294c54cdba49ab5c8fcaffff6"
      )
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>요청생성</button>
    </div>
  );
};

export default AxiosComponent;
