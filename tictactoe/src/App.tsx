import React from 'react';
import './App.css';

function Squares(props: { rows: string[][], placeMarker: (x: number, y: number) => void }) {
  const { rows, placeMarker } = props;


  const items = rows.map((row, y) => (<div>
    {row.map((cell, x) => <span onClick={() => (placeMarker(x, y))}>{cell}</span>)}
  </div>));

  return <ul>{items}</ul>;
}

function calculateWinner(rows: string[][]) {

  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let squares = [...rows[0], ...rows[1], ...rows[2]];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    console.log(squares);
    if (squares[a] !== "." && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return "";
}


const App = () => {
  const [winner, setWinner] = React.useState('');
  const [rows, setRows] = React.useState([[".", ".", "."], [".", ".", "."], [".", ".", "."]]);
  const [round, setRound] = React.useState(0);

  const restart = () => {
    setRows([[".", ".", "."], [".", ".", "."], [".", ".", "."]]);
    setWinner('');
    setRound(0);
  }

  const placeMarker = (x: number, y: number) => {
    if (winner !== '') {
      return;
    }

    if (rows[y][x] !== ".") {
      return;
    }

    const newRows = [...rows];
    newRows[y][x] = round % 2 === 0 ? "X" : "O";
    setRows(newRows);
    setRound(round + 1);
    setWinner(calculateWinner(newRows));
  }

  return (
    <div className="App">
      <header className="App-header">
        {winner && <p>Player {winner} wins!</p>}
        <ul><Squares rows={rows} placeMarker={placeMarker} /></ul>
        <p onClick={restart}>restart</p>
      </header>
    </div>
  );
}

export default App;