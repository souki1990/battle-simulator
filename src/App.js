import React, { useEffect, useState } from 'react';
import Player from './components/Player';
import { generateDiceSide } from './utils/util'
import Button from "react-bootstrap/Button"
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {

  const [game, setGame] = useState({ player1: {}, player2: {} })
  const [score, setScore] = useState({ player1: 100, player2: 100 })
  const [canAttack, setCanAttack] = useState(true);
  const [gameOver, setGameOver] = useState({ game: false, winner: 0 });
  const [moveStatus, setMoveStatus] = useState("");


  const initGame = () => {
    setGameOver({ game: false, winner: 0 })
    setGame({ player1: {}, player2: {} })
    setScore({ player1: 100, player2: 100 })
    setCanAttack(true);
    setMoveStatus()
  }

  const rollTheDice = () => {
    setMoveStatus("");
    setCanAttack(false);
    setGame({ player1: { dices: [generateDiceSide(), generateDiceSide()] }, player2: { dices: [generateDiceSide(), generateDiceSide()] } })
  }

  useEffect(() => {
    if (game.player1.dices) {
      calculateScore()
      setTimeout(() => setCanAttack(true), 2000)
    }
  }, [game])

  useEffect(() => {
    if ((score.player1 < 0) || (score.player1 === 0) || (score.player2 === 0) || (score.player2 < 0)) {
      setCanAttack(false);
      setGameOver({ game: true, winner: (score.player1 > score.player2) ? 1 : 2 });
    }
  }, [score])



  const calculateScore = () => {
    const { player1, player2 } = game;
    const score1 = player1.dices[0] + player1.dices[1];
    const score2 = player2.dices[0] + player2.dices[1];

    if (score1 < score2) {
      setScore({ ...score, player1: (score.player1 - (score2 - score1)) })
      setMoveStatus("Oups..Roll that dice again :( :(")
    }
    else if (score1 > score2) {
      setScore({ ...score, player2: (score.player2 - (score1 - score2)) })
      setMoveStatus("Yeah..Good game keep going!!")
    }
    else {
      setMoveStatus("You are even!!!!!!")
    }

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Battle Simulator</h1>
      </header>
      {!gameOver.game &&
        <>
          <div>
            <Player className="player player_1" name="You" dices={game.player1.dices} score={score.player1} />
            <Player color="red" className="player player_2" name="Monster" dices={game.player2.dices} score={score.player2} />
          </div>
          <Button variant="dark" size="lg" disabled={!canAttack} onClick={() => rollTheDice()}>Attack</Button>
          {moveStatus && <h3 className=" moveStatus fadeOut">{moveStatus}</h3>}
        </>}
      {
        gameOver.game &&
        <div className="winner">
          {gameOver.winner === 1 && <h1>Bravo.You Won!!!!</h1>}
          {gameOver.winner === 2 && <h1>Oups...You Lost.You will do better an other time</h1>}
          <Button variant="dark" onClick={() => initGame()}>Restart Game </Button>
        </div>
      }
    </div>
  );
}

export default App;
