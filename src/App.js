import "./styles/App.css";
import { Board } from "./components/vsPlayer/Board";
import Game from "./components/vsComputer/Game";
import { useState } from "react";
function App() {
  const [isComputer, setIsComputer] = useState(true);
  return (
    <div className="App">
      {isComputer ? <Game /> : <Board />}
      <div className="game-mode">
        <button
          className={
            isComputer ? "game-mode-buttons" : "game-mode-buttons-active"
          }
          onClick={() => setIsComputer(false)}
        >
          vs Player
        </button>
        <button
          className={
            !isComputer ? "game-mode-buttons" : "game-mode-buttons-active"
          }
          onClick={() => setIsComputer(true)}
        >
          vs Computer
        </button>
      </div>
    </div>
  );
}

export default App;
