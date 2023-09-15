const Welcome = ({ username, age, major }) => {
  return (
    <>
      <p>
        안녕하세요. {username}입니다. 나이는 {age}세 이고, 전공은 {major}입니다.
      </p>
    </>
  );
};

export default Welcome;
