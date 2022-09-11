import Board from "./components/Board";
import Popup from "./components/Popup";
import { useState, useEffect } from "react"


function App() {

  const [showSign, setShowSign] = useState(Array(10).fill(''))
  const [turn, setTurn] = useState('X')
  const [winner, setWinner] = useState()
  const [tie, setTie] = useState(false)
  const [winnerCell, setWinnerCell] = useState([])
  const [theme, setTheme] = useState(false)
  const [buttonPopup, setButtonPopup] = useState(false)
  const [mode, setMode] = useState('Hard')
  const [soloPlayer, setSoloPlayer] = useState(false)

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (soloPlayer && turn === 'O' && winnerCell.length === 0) {
        botTurn()
      }
    }, 500)
    return () => {
      clearTimeout(timeOut)
    }
  }, [turn])

  const checkForWinner = (squares) => {
    let openSpots = 0
    for (let i = 1; i <= 9; i++) {
      if (squares[i] === '') {
        openSpots++
      }
    }
    if (openSpots === 0) {
      setTie(true)
    }

    let combos = {
      across: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ],
      down: [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
      ],
      diagonal: [
        [1, 5, 9],
        [3, 5, 7]
      ]
    }
    for (let combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === '' ||
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === ''
        ) {
          //do nothing
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]])
          setTie(false)
          setWinnerCell(pattern)

        }
      });
    }
  }

  const botTurn = () => {
    let squares = [...showSign]

    if (mode === 'Easy') {
      //den index mit den freien feldern in die availableNumbers Pushen
      let availableNumbers = []
      squares.forEach(function (value, i) {
        if (squares[i] === '' && i !== 0) {
          availableNumbers.push(i)
        }
      })
      const randomField = availableNumbers[Math.floor(Math.random() * availableNumbers.length)]
      squares[randomField] = 'O'
      setShowSign(squares)
      if (winnerCell.length === 0) {
        checkForWinner(squares)
        setTurn('X')
        console.log(winnerCell)
      }
    }

    if (mode === 'Hard') {
      //Perfekter Algorythmus
      bestMove(squares)
    }
  }

  const bestMove = (squares) => {   // Irgendwas am algorythmus funktioniert
    let bestScore = Infinity
    let move
    for (let i = 1; i <= 9; i++) {
      //is the field available?
      if (squares[i] === '') {
        squares[i] = 'O'
        let score = minimax(squares, 0, true)
        squares[i] = ''
        if (score < bestScore) {
          bestScore = score
          move = i
        }
      }
    }
    squares[move] = 'O'
    setShowSign(squares)
    setTurn('X')
    checkForWinner(squares)
  }

  let scores = {
    X: 10,
    O: -10,
    tie: 0
  }

  const minimax = (squares, depth, isMaximizing) => {
    let result = checkWinner(squares)
    if (result !== null) {
      return scores[result]
    }

    if (isMaximizing) {
      let bestScore = -Infinity
      for (let i = 1; i <= 9; i++) {
        //Is the field available?
        if (squares[i] === '') {
          squares[i] = 'X'
          let score = minimax(squares, depth + 1, false)
          squares[i] = ''
          bestScore = Math.max(score, bestScore)
        }
      }
      return bestScore
    } else {
      let bestScore = Infinity
      for (let i = 1; i <= 9; i++) {
        //Is the field available?
        if (squares[i] === '') {
          squares[i] = 'O'
          let score = minimax(squares, depth + 1, true)
          squares[i] = ''
          bestScore = Math.min(score, bestScore)
        }
      }
      return bestScore
    }
  }

  function equals3(a, b, c) {
    return a === b && b === c && a !== '';
  }

  const checkWinner = (squares) => {
    let winna = null;

    // horizontal
    for (let i = 1; i <= 7; i += 3) {
      if (equals3(squares[i], squares[i + 1], squares[i + 2])) {
        winna = squares[i];
      }
    }

    // Vertical
    for (let i = 1; i <= 3; i++) {
      if (equals3(squares[i], squares[i + 3], squares[i + 6])) {
        winna = squares[i];
      }
    }

    // Diagonal
    if (equals3(squares[1], squares[5], squares[9])) {
      winna = squares[1];
    }
    if (equals3(squares[3], squares[5], squares[7])) {
      winna = squares[3];
    }

    let openSpots = 0;
    for (let i = 1; i <= 9; i++) {
      if (squares[i] === '') {
        openSpots++;
      }
    }

    if (winna === null && openSpots === 0) {
      return 'tie';
    } else {
      return winna;
    }
  }

  const handleClick = (cellValue) => {
    if (!soloPlayer) {
      if (winnerCell.length === 0) {
        if (showSign[cellValue] !== '') {
          alert(showSign[cellValue])
          return
        }

        let squares = [...showSign]

        if (turn === 'X') {
          squares[cellValue] = 'X'
          setTurn('O')
        }
        else {
          squares[cellValue] = 'O'
          setTurn('X')
        }
        checkForWinner(squares)
        setShowSign(squares)
      }
      else {
        alert('Junge fuck nicht ab')
        console.log(winnerCell)
      }
    }

    //Soloplayer
    if (soloPlayer) {
      if (winnerCell.length === 0) {

        if (showSign[cellValue] !== '') {
          alert(showSign[cellValue])
          return
        }

        let squares = [...showSign]

        if (turn === 'X') {
          squares[cellValue] = 'X'
          setTurn('O')
        }

        else {
          alert('Junge Spiel richtig lan')
        }
        checkForWinner(squares)
        setShowSign(squares)
      }
    }
  }


  const newGame = () => {
    setShowSign(Array(10).fill(''))
    setWinner(null)
    setTie(false)
    setTurn('X')
    setWinnerCell([])
  }

  const playMode = () => {
    setShowSign(Array(10).fill(''))
    setWinner(null)
    setTurn('X')
    setWinnerCell([])
    setTheme(!theme)
  }

  return (
    <>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup} mode={mode} setMode={setMode}>
        <h3>My Popup</h3>
      </Popup>
      <div className={theme ? "game-hard" : "game-calm"}>
        <div className="btn-grp">
          <button className="btn" onClick={playMode}>{theme ? 'Hard Theme' : 'Calm Theme'}</button>
          <button className="btn" onClick={() => setButtonPopup(true)}>Mode</button>
          <button className="btn" onClick={() => setSoloPlayer(!soloPlayer)}>{soloPlayer ? 'Vs Bot' : 'Duo'}</button>
        </div>


        {winnerCell.length === 0 && !tie ? (<h1 style={{ marginTop: '1em' }}>Turn {turn} </h1>) : tie ? (<h1 style={{ marginTop: '1em' }}>Unentschieden</h1>) : (<h1 style={{ marginTop: '1em' }}>{winner} won</h1>)}
        <h1>{mode}-Mode</h1>
        <Board handleClick={handleClick} showSign={showSign} winnerCell={winnerCell} />
        <div className="winnerContainer">
          {winner && (
            <>
              <p>{winner} is the winner</p>
              <button className="btn" onClick={() => newGame()}>New Game</button>
            </>
          )}
          {tie && (
            <>
              <p>Unentschieden!</p>
              <button className="btn" onClick={() => newGame()}>New Game</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
