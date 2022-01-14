import React from 'react';
import './App.css';

export interface AppProps {}

export interface AppState {
  rows: Array<String[]>;
  round: number;
  winner: string;
}

class App extends React.Component<AppProps, AppState>  {

  constructor(props: AppProps){
    super(props);
    this.state = {
      rows: [[".", ".", "."], [".", ".", "."],[".", ".", "."]],
      round: 0,
      winner: "",
    }
  }


  calculateWinner(rows: Array<String[]>): string {

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
        return "winner is: " + squares[a];
      }
    }

    return "";
  }

  updateItem(rowIndex: number, index: number) {
    this.setState( () => {
      const rows = this.state.rows;

      if (rows[rowIndex][index] !== "." || this.state.winner !== ""){
        return;
      }

      rows[rowIndex][index] = this.state.round % 2 === 0 ? "X" : "O";

      let round = this.state.round + 1;

      const winner =  this.calculateWinner(rows);

      return {
        rows,
        round,
        winner,
      };
    });
  };

  renderSquares(): JSX.Element[] {
    let list = this.state.rows;

    return list.map((row, index) => {
      return (
        <div>
          <text onClick={() => this.updateItem(index, 0)}>{row[0]}</text>
          <text onClick={() => this.updateItem(index, 1)}>{row[1]}</text>
          <text onClick={() => this.updateItem(index, 2)}>{row[2]}</text>
        </div>
      )
    })

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <text>{this.state.winner}</text>
        <ul>{this.renderSquares()}</ul>
        <text onClick={() => this.setState({rows: [[".", ".", "."], [".", ".", "."],[".", ".", "."]], winner: ""})}>restart</text>
        </header>
      </div>
    );
  }

}

export default App;