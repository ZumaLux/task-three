import React, { useEffect, useState } from "react";
import "./App.css";

function generateTable(rows, colls) {
  const table = new Array(rows).fill("").map(() => new Array(colls).fill(0));
  for (let i = 0; i < (rows * colls) / 2; i++) {
    let count = 0;
    while (count < 2) {
      const rowNum = Math.floor(Math.random() * rows);
      const colNum = Math.floor(Math.random() * colls);
      if (table[rowNum][colNum] === 0) {
        table[rowNum][colNum] = i + 1;
        count++;
      }
    }
  }
  return table;
}

const App = () => {
  const [memTable, setMemTable] = useState(generateTable(3, 4));
  const [revealedTable, setRevealedTable] = useState(
    new Array(memTable.length).fill("").map(() => new Array(memTable[0].length).fill(false))
  );
  const [prevClick, setPrevClick] = useState(null);
  const [preventClick, setPreventClick] = useState(false);
  const [stepCounter, setStepCounter] = useState(3);

  useEffect(() => {
    if (stepCounter === 0) {
      alert("GAME OVER");
      resetTable();
    }
  }, [stepCounter]);

  function handleCardClick(row, column) {
    if (revealedTable[row][column]) return;

    //reveal on click
    const newRevealedTable = [...revealedTable];
    newRevealedTable[row][column] = true;
    setRevealedTable([...newRevealedTable]);

    //second click
    if (prevClick) {
      setPreventClick(true);
      if (prevClick.num !== memTable[row][column]) {
        setTimeout(() => {
          newRevealedTable[prevClick.row][prevClick.column] = false;
          newRevealedTable[row][column] = false;
          setRevealedTable(newRevealedTable);
          setPreventClick(false);
          clearTimeout();
        }, 1000);
      } else {
        setPreventClick(false);
      }
      setPrevClick(null);
      setStepCounter((prev) => prev - 1);
    } else {
      //first click
      setPrevClick({ row: row, column: column, num: memTable[row][column] });
    }
  }

  function resetTable() {
    setMemTable(generateTable(3, 4));
    setRevealedTable(
      new Array(memTable.length).fill("").map(() => new Array(memTable[0].length).fill(false))
    );
    setStepCounter(3);
  }

  return (
    <div>
      {memTable.map((row, indexRow) => (
        <div key={indexRow} className="row">
          {row.map((num, indexCol) => (
            <div
              key={indexCol}
              className={`card ${preventClick && "prevent-click"}`}
              onClick={() => handleCardClick(indexRow, indexCol)}
            >
              <div>{revealedTable[indexRow][indexCol] ? num : ""}</div>
            </div>
          ))}
        </div>
      ))}
      <button onClick={() => resetTable()}>RESET</button>
      <span>Steps Left: {stepCounter}</span>
    </div>
  );
};
export default App;
