export default function Card({ gameStats, setGameStats, id }) {
  function handleClick(e) {
    if (gameStats.clickedCards.includes(id)) {
    } else {
      setGameStats({
        ...gameStats,
        clickedCards: [...gameStats.clickedCards, id],
      });
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
