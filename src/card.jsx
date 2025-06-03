export default function Card({ pickedPokemon, id }) {
  return (
    <button className={`card num${id}`}>
      <div className="imgContainer">
        <img
          src={pickedPokemon[id].sprite}
          alt={`official artwork for ${pickedPokemon[id].name} pokemon`}
        />
      </div>
      <div className="cardName">{pickedPokemon[id].name}</div>
    </button>
  );
}
