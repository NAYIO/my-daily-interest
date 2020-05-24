import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button className="square"
        onClick = {() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square 
      value = {this.props.squares[i]}
      onClick = {() => this.props.onClick(i)}
    />;
  }
  render() {
    const rows = [0,1,2];
    const cols = [0,1,2];
    return (
      <div>
        {
          rows.map((ele1,step1) => 
            <div key={ele1} className="board-row">
              {cols.map((ele2,step2) => this.renderSquare(step1*3+step2))}
            </div>
          )
        }
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ascending: true,
      history: [{
        squares: Array().fill(null)
      }],
      lastIndex: Array().fill(null),
      isNextX: true,
      stepNumber: 0
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber+1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const lastIndex = this.state.lastIndex.slice();
    const temp = JudgeWinner(squares);
    if(squares[i] || temp){
      return;
    }
    squares[i] = this.state.isNextX ? 'X' : 'O';
    lastIndex[this.state.stepNumber] = i;
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      lastIndex: lastIndex,
      isNextX: !this.state.isNextX,
      stepNumber: history.length
    })
  }
  jumpTo(step) {
    const lastIndex = this.state.lastIndex.slice();
    lastIndex.map((ele) => document.getElementsByClassName('square')[ele].style = "background: #fff");
    this.setState({
      isNextX: step % 2 === 0,
      stepNumber: step
    })
  }
  changeOrder() {
    this.setState({
      ascending: !this.state.ascending
    });
  }
  render() {
    //stepNumber是从0开始的，渲染是在handleClike之前进行的，start对应0
    const history = this.state.history.slice();
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    let lastIndex = this.state.lastIndex;
    const orderTip = this.state.ascending? '正序' : '倒序';
    const order = <button className="ascending" value={this.state.ascending? '正序' : '倒序'} onClick={() => this.changeOrder()}>{orderTip}</button>;
    if(!this.state.ascending){
      lastIndex = lastIndex.reverse();
    }
    const moves = history.map((curr,step) => { 
      const desc = step ? 'Step '+step +'('+ parseInt(lastIndex[step-1]/3)+','+lastIndex[step-1]%3+')' : 'Start!';
      const className = (step === this.state.stepNumber) ? 'current-step' : 'step';
      return(
        <li key = {step}>
          <button className = {className} onClick = {() => this.jumpTo(step)}>{desc}</button>
        </li>
      )
    })
    let status ;
    const temp = JudgeWinner(squares);
    if(temp){
      status = 'The Winner is ' + temp.winner;
      for(let i of temp.winnerIndex){
        document.getElementsByClassName('square')[i].style = "background: lightblue";
      }
    }else{
      if(this.state.stepNumber === 9){
        status = 'Peace! No Winner!'
      }else{
      status = 'Next player: ' + (this.state.isNextX ? 'X' : 'O');
      }
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares = {squares}
            onClick = {(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{order}</div>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
function JudgeWinner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(let i=0;i<lines.length;i++){
    const [a,b,c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[b] && squares[c]){
      return {
        winner:squares[a],
        winnerIndex: [a,b,c]
      }
    }
  }
  return null;
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
