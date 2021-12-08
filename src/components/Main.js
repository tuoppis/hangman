import Keyboard from "./Keyboard";
import ShowDrawing from "./ShowDrawing";
import ShowWord from "./ShowWord";
import React from "react";
import GameHeader from "./GameHeader";
/*
let wordList = [
    "VIISIKKO", "EPÄTOSI", "JOPAS", "JOTAKIN", "MELKEIN", "PÄÄKALLO", "ZEEBRA", "RUSKEA", "VÄRITÖN", "PALLUKKA",
    "BANAALI", "BRUTAALI", "VEIKKAUS", "RETKEILIJÄ", "XENON", "DATANOMI", "LAADUKAS", "PITKÄ", "SUOMI", "JÄRVI",
    "AUTUAS", "DIPLOMI", "ONGET", "MIKSI", "LAADUKAS", "SUTINA", "RYÖKÄLE", "NAPERO", "UIMARI", "KUPARI", "POSKI"
];
*/

function getRandomFrom(array) {
    return array[Math.floor(array.length * Math.random())];
}

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.getInitialState();
        this.guesses = 9;
        this.difficulty = "Easy";
        this.wordList = [""];

        this.characterPressed = this.characterPressed.bind(this);
        this.gameOver = this.gameOver.bind(this);
        this.newGame = this.newGame.bind(this);
    }

    getInitialState() {
        let state = {
            charsRemain: 100,
            guessedChars: [],
            toGuessChars: [],
            wrongGuessCount: 0,
            message: "Pick a Letter!",
            gameState: 0
        }

        return state;
    }
    
    characterPressed(e) {
        let guessed = this.checkGuess(e, this.state.toGuessChars);
        let btn = document.getElementById("key"+e);
        let state = {...this.state};
        state.guessedChars = [...this.state.guessedChars, e];
        btn.disabled = true;
        if (guessed > 0) {
            state.charsRemain -= guessed;
            state.message = state.charsRemain > 0 ? "Correct!" : "You won";
        } else {
            state.wrongGuessCount++;
            state.message = state.wrongGuessCount < 9 ? "Wrong!" : "You lost!";
        }
        this.setState(state);

        if (state.wrongGuessCount >= 9 || state.charsRemain <= 0) this.gameOver();
    }

    /**
     * Picks a new word from wordlist
     * */
    initWord() {
        let state = {...this.state};
        let word = getRandomFrom(this.wordList).toUpperCase();
        state.toGuessChars = [...word];
        state.guessedChars = [];
        state.charsRemain = word.length;
        state.wrongGuessCount = 9 - this.guesses;

        this.setState(state);
    }

    newGame(obj) {
        this.state = this.getInitialState();

        if (typeof obj === "object") {
            this.wordList = obj.words;
            this.guesses = obj.guesses;
            this.difficulty = obj.difficulty;
            obj = false;
        }
        
        //this.state.wrongGuessCount = 9 - this.guesses;
        this.state.gameState = obj ? 0 : 1;

        this.initWord();
    }

    checkGuess(ch, array) {
        let sum = 0;
        for (let idx in array) {
            if (array[idx] === ch) sum++;
        }
        return sum;
    }

    componentDidMount() {
        //this.init();
    }

    gameOver() {
        let state = { ...this.state, gameState: 2 };
        this.setState(state);
    }

    render() {
        return (
            <>
                <GameHeader gameState={this.state.gameState} message={this.state.message} guessesLeft={this.guesses - this.state.wrongGuessCount} newGame={this.newGame} />
                <ShowDrawing drawingIndex={this.state.wrongGuessCount + 1} />
                <ShowWord toGuessChars={this.state.toGuessChars} guessedChars={this.state.guessedChars} />
                <Keyboard MainCharacterPressed={this.characterPressed} visible={this.state.gameState === 1} />
            </>
        );
    }
}

export default Main;

/*

<h3>Hirsipuu</h3>
                <div id="peli">
                    <p>Sinulla on {9 - this.state.wrongGuessCount} arvausta jäljellä!</p>
                    <p>{this.state.message}</p>
                </div>
                <div id="gameover">
                    <button onClick={() => window.location.reload(false)}>Pelaa uudelleen!</button>
                </div>

*/