import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { POKEMON_API_URL } from "./App";

const fetchPokemonDetails = async (url) => {
  const response = await fetch(url);

  // Check if the response status is OK
  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}. Status: ${response.status}`);
  }

  return await response.json();
};

function PokemonDetails() {
  const [pokemon, setPokemon] = useState(null);

  // Use useParams to get route parameters
  const { pokemonId } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // Construct the URL using the ID
        const detailsURL = `${POKEMON_API_URL}/${pokemonId}`;
        const details = await fetchPokemonDetails(detailsURL);
        setPokemon(details);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchDetails();
  }, [pokemonId]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <p>Height: {pokemon.height / 10} meters</p>
      <p>Weight: {pokemon.weight / 10} kg</p>
    </div>
  );
}

export default PokemonDetails;
