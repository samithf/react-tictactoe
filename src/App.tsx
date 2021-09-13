import "./App.css";
import Board from "./components/Board";
import { useAppContext } from "./Store";
import { XIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/outline";

function App() {
  const { player, probability } = useAppContext();
  return (
    <div className="App">
      <div className="guide">
        <div className="usericon">
          Player A <XIcon />
        </div>
        <div className="usericon">
          Player B <CheckIcon />
        </div>
      </div>

      {probability && probability === "WIN_A" && (
        <h1 className="notify">Player A won!</h1>
      )}
      {probability && probability === "WIN_B" && (
        <h1 className="notify">Player B won!</h1>
      )}
      {probability && probability === "DRAW" && (
        <h1 className="notify">Draw</h1>
      )}
      {!probability && <h1 className="notify">Player {player}'s turn</h1>}
      <Board />
    </div>
  );
}

export default App;
