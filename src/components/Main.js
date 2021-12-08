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
        document.getElementById("key"+e).disabled = true;
        let guessed = this.checkGuess(e, this.state.toGuessChars);
        let state = {...this.state};
        state.guessedChars.push(e); // = [...this.state.guessedChars, e];
        if (guessed > 0) {
            state.charsRemain -= guessed;
            state.message = state.charsRemain > 0 ? "Correct!" : "You won";
        } else {
            state.wrongGuessCount++;
            state.message = state.wrongGuessCount < 9 ? "Wrong!" : "You lost!";
        }

        if ((state.wrongGuessCount >= 9) || (state.charsRemain <= 0)) this.gameOver(state);
        else this.setState(state);
    }

    /**
     * Picks a new word from wordlist resets 
     * */
    initWord() {
        let state = {...this.state};
        let word = getRandomFrom(this.wordList).toUpperCase();
        state.toGuessChars = [...word];
        state.guessedChars = [];
        state.charsRemain = word.length;
        state.wrongGuessCount = 9 - this.guesses;

        this.setState(state);

        //enable all keys
        let keyboard = document.getElementById("keyboard").childNodes;

        for (let btn of keyboard) {
            btn.disabled = false;
        }
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
        for (let letter of array) if (letter === ch) sum++;
        return sum;
    }

    componentDidMount() {
        //this.init();
    }

    gameOver(state) {
        state.gameState = 2;
        this.setState(state);
    }

    render() {
        return (
            <>
                <h3>Hangman {this.difficulty}</h3>
                <GameHeader gameState={this.state.gameState} message={this.state.message} 
                    guessesLeft={9 - this.state.wrongGuessCount} newGame={this.newGame} />
                <ShowDrawing drawingIndex={this.state.wrongGuessCount + 1} />
                <ShowWord toGuessChars={this.state.toGuessChars} guessedChars={this.state.guessedChars} 
                    visible={this.state.gameState !== 0} reveal={this.state.gameState===2}/>
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