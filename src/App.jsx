import { useState } from 'react';
import { useEffect } from 'react';
import Popup from './popup.jsx';
import Card from './card.jsx';
import './App.css';

export default function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [gameStats, setGameStats] = useState({
    currentScore: 0,
    highScore: 0,
    clickedCards: [],
    pickedPokemon: [],
    gameStatus: 'ongoing',
  });
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      async function getPokemon() {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
        const response = await fetch(url);
        const pokemonData = await response.json();
        setAllPokemon(pokemonData.results);
        processPokemon(pokemonData.results, setGameStats);
      }
      getPokemon();
    }
    return () => {
      ignore = true;
    };
  }, []);
  function repickPokemon() {
    processPokemon(allPokemon, setGameStats, gameStats);
  }
  return (
    <>
      <header>
        <h1 id="title">Memory card game</h1>
        <div className="scoreContainer">
          <div className="currentScore">{`current score:${gameStats.currentScore}`}</div>
          <div className="highScore">{`high score:${gameStats.highScore}`}</div>
        </div>
      </header>
      <div className="cardContainer">
        <Popup
          repickPokemon={repickPokemon}
          gameStats={gameStats}
          setGameStats={setGameStats}
          gameStatus={gameStats.gameStatus}
        ></Popup>
        {gameStats.pickedPokemon.map((pokemon) => {
          return (
            <Card
              gameStats={gameStats}
              setGameStats={setGameStats}
              key={pokemon.id}
              id={pokemon.id}
            />
          );
        })}
      </div>
    </>
  );
}

async function processPokemon(data, setGameStats, gameStats) {
  let pickedIndexes = [];
  let processedData = [];
  for (let i = 0; i < 15; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * data.length - 1);
    } while (pickedIndexes.includes(index));
    pickedIndexes.push(index);
    await getPokemonImg(data[index], processedData);
  }
  if (gameStats === undefined) {
    setGameStats({
      currentScore: 0,
      highScore: 0,
      clickedCards: [],
      pickedPokemon: processedData,
      gameStatus: 'ongoing',
    });
  } else {
    setGameStats({
      ...gameStats,
      currentScore: 0,
      clickedCards: [],
      pickedPokemon: processedData,
      gameStatus: 'ongoing',
    });
  }
}

async function getPokemonImg(pokemon, processedData) {
  let sprite;
  let name;
  let id;
  const url = pokemon.url;
  const response = await fetch(url);
  const pokemonData = await response.json();
  if (pokemonData.sprites.other['official-artwork'].front_default) {
    name = pokemonData.name;
    sprite = pokemonData.sprites.other['official-artwork'].front_default;
    id = pokemonData.id;
  } else {
    const urlTwo = pokemonData.species.url;
    const responseTwo = await fetch(urlTwo);
    const twoData = await responseTwo.json();
    const urlThree = twoData.varieties[0].pokemon.url;
    const responseThree = await fetch(urlThree);
    const threeData = await responseThree.json();
    sprite = threeData.sprites.other['official-artwork'].front_default;
    name = threeData.name;
    id = threeData.id;
  }
  processedData.push({
    name: name,
    sprite: sprite,
    id: id,
  });
}
