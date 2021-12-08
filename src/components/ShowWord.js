function ShowWord({toGuessChars, guessedChars, visible, reveal}) {
    const makeCell = (ch, idx) => {
        const hasChar = guessedChars.includes(ch);
        const displayChar = reveal || hasChar ? ch : "*"
        const endStyle = { backgroundColor: hasChar ? "#70ff7030" : "#ff707030", border: "none" }

        return (
            <td className="guessed" style={ reveal ? endStyle : {} }>{displayChar}</td>
        );
    }

    return (
        <table id="showWord" style={{display:visible ? "block" : "none"}}>
            <thead>
                <tr>
                    {toGuessChars.map(makeCell)}
                </tr>
            </thead>
        </table>
    );
}

export default ShowWord;