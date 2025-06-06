export default function Card({ gameStats, setGameStats, id }) {
  function handleClick(e) {
    if (gameStats.clickedCards.includes(id)) {
    } else {
      if (gameStats.currentScore + 1 > gameStats.highScore) {
        setGameStats({
          ...gameStats,
          highScore: gameStats.highScore + 1,
          clickedCards: [...gameStats.clickedCards, id],
          currentScore: gameStats.currentScore + 1,
          pickedPokemon: gameStats.pickedPokemon.sort(
            () => Math.random() - 0.5,
          ),
        });
      } else {
        setGameStats({
          ...gameStats,
          clickedCards: [...gameStats.clickedCards, id],
          currentScore: gameStats.currentScore + 1,
          pickedPokemon: gameStats.pickedPokemon.sort(
            () => Math.random() - 0.5,
          ),
        });
      }
    }
  }
  return (
    <button className={`card num${id}`} onClick={handleClick}>
      <div className="imgContainer">
        <img
          src={gameStats.pickedPokemon[id].sprite}
          alt={`official artwork for ${gameStats.pickedPokemon[id].name} pokemon`}
        />
      </div>
      <div className="cardName">{gameStats.pickedPokemon[id].name}</div>
      <div>{gameStats.clickedCards}</div>
    </button>
  );
}
