import Keyboard from "./Keyboard";
import ShowDrawing from "./ShowDrawing";
import ShowWord from "./ShowWord";
import React, {useState} from "react";

let wordList = [
    "VIISIKKO", "EPÄTOSI", "JOPAS", "JOTAKIN", "MELKEIN", "PÄÄKALLO", "ZEEBRA", "RUSKEA", "VÄRITÖN", "PALLUKKA",
    "BANAALI", "BRUTAALI", "VEIKKAUS", "RETKEILIJÄ", "XENON", "DATANOMI", "LAADUKAS", "PITKÄ", "SUOMI", "JÄRVI",
    "AUTUAS", "DIPLOMI", "ONGET", "MIKSI", "LAADUKAS", "SUTINA", "RYÖKÄLE", "NAPERO", "UIMARI", "KUPARI", "POSKI"
];

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            charsRemain: 100,
            guessedChars: [],
            toGuessChars: [..."TESTISANA"],
            wrongGuessCount: 0,
            message: "Valitse kirjain!"
        }
        this.characterPressed = this.characterPressed.bind(this);
        this.gameOver = this.gameOver.bind(this);
    }
    
    characterPressed(e) {
        let guessed = this.checkGuess(e, this.state.toGuessChars);
        let btn = document.getElementById("key"+e);
        let state = {...this.state};
        state.guessedChars = [...this.state.guessedChars, e];
        btn.disabled = true;
        if (guessed > 0) {
            state.charsRemain -= guessed;
            state.message = state.charsRemain > 0 ? "Arvasit oikein!" : "Voitit pelin!";
        } else {
            state.wrongGuessCount++;
            state.message = state.wrongGuessCount < 9 ? "Arvasit väärin!" : "Hävisit pelin!";
        }
        this.setState(state);

        if (state.wrongGuessCount >= 9 || state.charsRemain <= 0) this.gameOver();
    }

    init() {
        document.getElementById("gameover").style.display = "none";
        document.getElementById("gameon").style.display = "block";

        let state = {...this.state};
        let word = wordList[Math.floor(wordList.length*Math.random())].toUpperCase();
        state.toGuessChars = [...word];
        state.charsRemain = word.length;

        this.setState(state);
    }

    checkGuess(ch, array) {
        let sum = 0;
        for (let idx in array) {
            if (array[idx] === ch) sum++;
        }
        return sum;
    }

    componentDidMount() {
        this.init();
    }

    gameOver() {
        document.getElementById("gameover").style.display = "block";
        document.getElementById("gameon").style.display = "none";
    }

    render() {
        return (
            <>
                <h3>Hirsipuu</h3>
                <div id="peli">
                    <p>Sinulla on {9 - this.state.wrongGuessCount} arvausta jäljellä!</p>
                    <p>{this.state.message}</p>
                </div>
                <div id="gameover">
                    <button onClick={() => window.location.reload(false)}>Pelaa uudelleen!</button>
                </div>

                <ShowDrawing drawingIndex={this.state.wrongGuessCount + 1} />
                <ShowWord toGuessChars={this.state.toGuessChars} guessedChars={this.state.guessedChars} />
                <div id="gameon">
                    <Keyboard MainCharacterPressed={this.characterPressed} />
                </div>
            </>
        );
    }
}

export default Main;