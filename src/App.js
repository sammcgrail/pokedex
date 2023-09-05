import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonDetails from "./Pokemondetails";
import HomePage from "./Homepage.js";

export const POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon";

const fetchPokemonDetails = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(`${POKEMON_API_URL}?limit=151`);
      const body = await response.json();
      const pokemonPromises = body.results.map((pokemon) =>
        fetchPokemonDetails(pokemon.url)
      );
      const pokemonDetails = await Promise.all(pokemonPromises);
      const sortedPokemon = pokemonDetails.sort((a, b) => a.height - b.height);
      setPokemonList(sortedPokemon);
    };
    fetchPokemons();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage pokemonList={pokemonList} />} />
          <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
