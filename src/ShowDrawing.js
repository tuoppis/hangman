function ShowDrawing({drawingIndex}) {
    return (
        <img className="image" src={`${process.env.PUBLIC_URL}/images/hangman_${drawingIndex}.png`} alt={`Image ${drawingIndex}`} />
    );
}

export default ShowDrawing;