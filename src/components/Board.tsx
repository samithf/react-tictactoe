import React, { useEffect } from "react";
import { useAppContext } from "../Store";
import "./Board.css";
import Square from "./Square";

const boxIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const winningDirections = [
  // left to right
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],

  // top to bottom
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],

  // X
  [1, 5, 9],
  [3, 5, 7],
];

const Board = () => {
  const { dispatch, markedByA, markedByB, probability } = useAppContext();

  useEffect(() => {
    if (markedByA.length + markedByB.length === 9 && !probability) {
      dispatch({ type: "SET_PROBABILITY", payload: "DRAW" });
    }
  }, [markedByA, markedByB, probability, dispatch]);

  useEffect(() => {
    if (!markedByA.length) return;
    for (const winningDirection of winningDirections) {
      const winnerA = isWinner(markedByA.sort(), winningDirection);
      if (winnerA) {
        dispatch({ type: "SET_PROBABILITY", payload: "WIN_A" });
        // alert("You won!");
        return;
      }
    }
  }, [markedByA, dispatch]);

  useEffect(() => {
    if (!markedByB.length) return;
    for (const winningDirection of winningDirections) {
      const winnerB = isWinner(markedByB.sort(), winningDirection);
      if (winnerB) {
        dispatch({ type: "SET_PROBABILITY", payload: "WIN_B" });
        // alert("The opponent won!");
        return;
      }
    }
  }, [markedByB, dispatch]);

  function resetBoard() {
    dispatch({ type: "RESET_BOARD" });
  }

  function isWinner(chosen: number[], winnerDirection: number[]) {
    const winningNumbers: number[] = [];
    for (let x = 0; x < chosen.length; x++) {
      if (winnerDirection.includes(chosen[x])) {
        winningNumbers.push(chosen[x]);
      }
    }

    return winningNumbers.sort().join("") === winnerDirection.sort().join("");
  }

  return (
    <React.Fragment>
      <div className="board">
        {boxIndexes.map((index) => (
          <Square key={index} index={index} />
        ))}
      </div>
      <button id="reset" onClick={resetBoard}>
        Reset
      </button>
    </React.Fragment>
  );
};

export default Board;
