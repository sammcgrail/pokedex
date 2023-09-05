import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import PokemonDetails from "./Pokemondetails";

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

      // Sort Pokemon by height
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

function HomePage({ pokemonList }) {
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const sortedPokemonList = [...pokemonList].sort((a, b) => {
    if (!sortField) return 0;

    // Special handling for types since it's an array
    if (sortField === "types") {
      const aType = a.types[0].type.name;
      const bType = b.types[0].type.name;
      return sortOrder === "asc"
        ? aType.localeCompare(bType)
        : bType.localeCompare(aType);
    }

    if (sortOrder === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSort("id")}>#</th>
          <th onClick={() => handleSort("name")}>Name</th>
          <th onClick={() => handleSort("height")}>Height (m)</th>
          <th onClick={() => handleSort("weight")}>Weight (kg)</th>
          <th onClick={() => handleSort("types")}>Type</th>
        </tr>
      </thead>
      <tbody>
        {sortedPokemonList.map((pokemon) => (
          <tr key={pokemon.id}>
            <td>{pokemon.id}</td>
            <td>
              <Link to={`/pokemon/${pokemon.id}`} style={{ color: "white" }}>
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </Link>
            </td>
            <td>{pokemon.height / 10}</td>
            <td>{pokemon.weight / 10}</td>
            <td>{pokemon.types.map((type) => type.type.name).join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
