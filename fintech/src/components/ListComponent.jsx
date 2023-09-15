import React, { useState } from "react";
import Welcome from "./Welcome";

const ListComponent = () => {
  const [users, setUsers] = useState([
    { usename: "홍길동", age: 11, major: "경영학" },
    { usename: "김길동", age: 12, major: "회계학" },
    { usename: "왕길동", age: 13, major: "컴공" },
  ]);
  return (
    <div>
      {users.map((user, index) => {
        return (
          <Welcome
            key={index}
            username={user.usename}
            age={user.age}
            major={user.major}
          ></Welcome>
        );
      })}
    </div>
  );
};

export default ListComponent;
