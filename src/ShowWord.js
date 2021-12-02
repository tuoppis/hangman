function ShowWord({toGuessChars, guessedChars}) {
    const checkGuessed = (ch) => {
        return guessedChars.includes(ch) ? ch : "*";
    }

    return (
        <table className="showWord">
            <thead>
                <tr>
                    {toGuessChars.map((ch, idx) => <td className="guessed">{checkGuessed(ch)}</td>)}
                </tr>
            </thead>
        </table>
    );

}

export default ShowWord;