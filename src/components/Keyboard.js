import "./Keyboard.css"
var AllowedChars = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];//ÅÄÖ"];

function Keyboard({MainCharacterPressed, visible}) {
    return (
        <div id="keyboard" style={{display:visible?"block" : "none"}}>
            {AllowedChars.map((ch, idx) => <button id={`key${ch}`} onClick={() => MainCharacterPressed(ch)}>{ch}</button>)}
        </div>
    );
}

export default Keyboard;