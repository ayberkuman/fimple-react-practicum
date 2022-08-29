export const Square = ({ onClick, value, isWinner }) => {
  console.log(isWinner);
  return (
    <button
      className={value ? "square" : "empty-square"}
      id={value === "X" ? "first" : "second"}
      onClick={onClick}
    >
      {isWinner && <div className="winner-row"></div>}
      {value}
    </button>
  );
};
