var wordList = require(`${process.env.PUBLIC_URL}/en-dictionary.json`);

function GameSelect({ callback, visible }) {
    const loadWords = (minDiff, maxDiff) => {
        let list = [];
        for (let word in wordList) {
            if (word.length >= 4 && wordList.word >= minDiff && wordList.word < maxDiff) list.append(word);
        }
        return list;
    }

    return (
        <div id="game-select" style={{ display: visible ? "block" : "none" }}>
            <p>Select Difficulty</p>
            <button onClick={() => callback({ words: loadWords(0, 13), guesses: 9, difficulty: "Easy" })}>Easy</button>
            <button onClick={() => callback({ words: loadWords(10.5, 16.5), guesses: 9, difficulty: "Normal" })}>Normal</button>
            <button onClick={() => callback({ words: loadWords(13, 19.5), guesses: 7, difficulty: "Hard" })}>Hard</button>
            <button onClick={() => callback({ words: loadwords(16.5, 70), guesses: 5, difficulty: "Expert" })}>Expert</button>
        </div>
    );
}

export default GameSelect;