var AllowedChars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ"];

function Keyboard({MainCharacterPressed}) {
    return (
        <div className="keyboard">
            {AllowedChars.map((ch, idx) => <button id={`key${ch}`} className="character" onClick={() => MainCharacterPressed(ch)}>{ch}</button>)}
        </div>
    );

}

export default Keyboard;