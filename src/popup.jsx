export default function Popoup({
  gameStats,
  setGameStats,
  gameStatus,
  repickPokemon,
}) {
  async function handleClick(e) {
    setGameStats({ ...gameStats, pickedPokemon: [], gameStatus: 'ongoing' });
    await repickPokemon();
  }
  return (
    <div
      className="cover"
      style={
        gameStatus === 'ongoing' ? { display: 'none' } : { display: 'flex' }
      }
    >
      <div className="popup">
        <div className="gameStatus">
          {(() => {
            if (gameStatus === 'won') {
              return <h2>You Win!</h2>;
            } else if (gameStatus === 'lost') {
              return <h2>You lost.</h2>;
            }
          })()}
        </div>
        <div className="description">
          {(() => {
            if (gameStatus === 'won') {
              return 'Congratulations on getting a perfect score, its certainly not easy!';
            } else if (gameStatus === 'lost') {
              return "Don't be discouraged each try you get closer to a victory!";
            }
          })()}
        </div>
        <div className="scoreContainerPopup">
          <div className="highScorePopup">{`high score: ${gameStats.highScore}`}</div>
          <div className="currentScorePopup">{`current score: ${gameStats.currentScore}`}</div>
        </div>
        <button className="tryAgain" onClick={handleClick}>
          Try Again
        </button>
      </div>
    </div>
  );
}
