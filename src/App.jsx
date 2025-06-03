import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

export default function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [pickedPokemon, setPickedPokemon] = useState([]);
  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      async function getPokemon() {
        const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
        const response = await fetch(url);
        const pokemonData = await response.json();
        setAllPokemon(pokemonData.results);
        processPokemon(pokemonData.results);
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
        <t1 id="title">Memory card game</t1>
      </header>
    </>
  );
}

function processPokemon(data) {
  let pickedIndexes = [];
  let processedData = [];
  for (let i = 0; i < 15; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * data.length - 1);
    } while (pickedIndexes.includes(index));
    pickedIndexes.push(index);
    getPokemonImg(data[index], processedData);
  }
  console.log(processedData);
}

async function getPokemonImg(pokemon, processedData) {
  const url = pokemon.url;
  const response = await fetch(url);
  const pokemonData = await response.json();
  const sprite = pokemonData.sprites.other['official-artwork'].front_default;
  processedData.push({ name: pokemon.name, sprite: sprite });
}
