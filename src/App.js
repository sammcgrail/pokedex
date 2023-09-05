import React, { useState, useEffect } from "react";
import "./App.css";

const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

const fetchPokemonDetails = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(`${POKEMON_API_URL}?limit=100`);
      const body = await response.json();

      const pokemonPromises = body.results.map((pokemon) =>
        fetchPokemonDetails(pokemon.url)
      );

      const pokemonDetails = await Promise.all(pokemonPromises);

      // Sort Pokemon by height
      const sortedPokemon = pokemonDetails.sort((a, b) => a.height - b.height);

      setPokemonList(sortedPokemon);
    };

    fetchPokemons();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemon useEffect</h1>
        <ul>
          {pokemonList.map((pokemon) => (
            <li key={pokemon.name}>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}{" "}
              (Height: {pokemon.height})
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
