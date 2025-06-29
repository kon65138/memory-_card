export default function Card({ gameStats, setGameStats, id }) {
  let arr = [];
  for (let pokemon of gameStats.pickedPokemon) {
    arr.push(pokemon.id);
  }
  const index = arr.indexOf(id);

  function handleClick() {
    if (gameStats.clickedCards.includes(id)) {
      setGameStats({
        ...gameStats,
        clickedCards: [],
        gameStatus: 'lost',
      });
    } else {
      if (gameStats.currentScore + 1 > gameStats.highScore) {
        if (gameStats.currentScore === 14) {
          setGameStats({
            ...gameStats,
            highScore: gameStats.highScore + 1,
            clickedCards: [...gameStats.clickedCards, id],
            currentScore: gameStats.currentScore + 1,
            gameStatus: 'won',
          });
        } else {
          setGameStats({
            ...gameStats,
            highScore: gameStats.highScore + 1,
            clickedCards: [...gameStats.clickedCards, id],
            currentScore: gameStats.currentScore + 1,
            pickedPokemon: gameStats.pickedPokemon.sort(
              () => Math.random() - 0.5,
            ),
          });
        }
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
          src={gameStats.pickedPokemon[index].sprite}
          alt={`official artwork for ${gameStats.pickedPokemon[index].name} pokemon`}
        />
      </div>
      <div className="cardName">{gameStats.pickedPokemon[index].name}</div>
    </button>
  );
}
