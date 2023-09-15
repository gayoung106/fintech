import React from "react";

const Result = ({ articles }) => {
  return (
    <div>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Result;
