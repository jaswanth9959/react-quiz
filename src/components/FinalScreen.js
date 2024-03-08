function FinalScreen({ points, highScore, dispatch }) {
  return (
    <>
      <p className="result">
        {" "}
        Your score is <strong>{points}</strong>
      </p>
      <p className="highscore">Your highScore is {highScore}.</p>
      <button className="btn" onClick={() => dispatch({ type: "reset" })}>
        Retake
      </button>
    </>
  );
}

export default FinalScreen;
