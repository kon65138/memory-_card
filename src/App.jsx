import { useState } from 'react';
import { useEffect } from 'react';
import Card from './card.jsx';
import './App.css';

export default function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [pickedPokemon, setPickedPokemon] = useState([]);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      console.log('fetching data');
      async function getPokemon() {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
        const response = await fetch(url);
        const pokemonData = await response.json();
        setAllPokemon(pokemonData.results);
        processPokemon(pokemonData.results, setPickedPokemon);
      }
      getPokemon();
    }
    return () => {
      ignore = true;
    };
  }, []);
  return (
    <>
      <header>
        <h1 id="title">Memory card game</h1>
      </header>
      <div className="cardContainer">
        {pickedPokemon.map((pokemon) => {
          return (
            <Card
              pickedPokemon={pickedPokemon}
              key={pokemon.id}
              id={pokemon.id}
            />
          );
        })}
      </div>
    </>
  );
}

async function processPokemon(data, setPickedPokemon) {
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
  setPickedPokemon(processedData);
}

async function getPokemonImg(pokemon, processedData) {
  let sprite;
  let name;
  const url = pokemon.url;
  const response = await fetch(url);
  const pokemonData = await response.json();
  if (pokemonData.sprites.other['official-artwork'].front_default) {
    name = pokemonData.name;
    sprite = pokemonData.sprites.other['official-artwork'].front_default;
  } else {
    const urlTwo = pokemonData.species.url;
    const responseTwo = await fetch(urlTwo);
    const twoData = await responseTwo.json();
    const urlThree = twoData.varieties[0].pokemon.url;
    const responseThree = await fetch(urlThree);
    const threeData = await responseThree.json();
    sprite = threeData.sprites.other['official-artwork'].front_default;
    name = threeData.name;
  }
  processedData.push({
    name: name,
    sprite: sprite,
    id: processedData.length,
  });
}
