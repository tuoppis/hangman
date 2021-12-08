import "./GameHeader.css";
import GameSelect from "./GameSelect";

function GameHeader({ gameState, message, guessesLeft, newGame }) {
    // Gamestate:
    //  0: select difficulty 
    //  1: select letter
    //  2: game over
    return (
        <div class="game-header">
            
            <div id="game-info" style={ {display: gameState===1 ? "block" : "none"} }>
                <p>You have {guessesLeft} guess{guessesLeft !== 1 ? "es" : ""} left!</p>
                <p>{message}</p>
            </div>
            <div id="gameover" style={{ display: gameState === 2 ? "block" : "none" }}>
                <p>{message}</p>
                <button onClick={() => newGame(true)}>Change Difficulty</button>
                <button onClick={() => newGame(false)}>Keep Playing!</button>
            </div>
            <GameSelect visible={gameState === 0} callback={newGame} />
        </div>
    );
}

export default GameHeader;