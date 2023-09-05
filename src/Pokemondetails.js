import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
  const { pokemonURL } = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const decodedURL = atob(pokemonURL);
        const details = await fetchPokemonDetails(decodedURL);
        setPokemon(details);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchDetails();
  }, [pokemonURL]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div>
      <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </div>
  );
}

export default PokemonDetails;
