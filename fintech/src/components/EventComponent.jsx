import React from "react";

const EventComponent = () => {
  const handleChange = (event) => {
    console.log(event.target.value);
  };
  const handleClick = () => {
    alert("클릭");
  };
  return (
    <div>
      <input onChange={handleChange}></input>
      <button onClick={handleClick}>전송</button>
    </div>
  );
};

export default EventComponent;
