import React, { useState, useEffect } from "react";
import PokemonChart from "./PokemonChart";

function HomePage({ pokemonList }) {
  const [sortedPokemonList, setSortedPokemonList] = useState(pokemonList);
  const [sortingKey, setSortingKey] = useState("id");
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    let sortedList = [...pokemonList].sort((a, b) => {
      if (ascending) {
        return a[sortingKey] - b[sortingKey];
      } else {
        return b[sortingKey] - a[sortingKey];
      }
    });
    setSortedPokemonList(sortedList);
  }, [pokemonList, sortingKey, ascending]);

  const handleSort = (key) => {
    setAscending((prev) => (key === sortingKey ? !prev : true));
    setSortingKey(key);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>ID</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("height")}>Height</th>
            <th onClick={() => handleSort("weight")}>Weight</th>
          </tr>
        </thead>
        <tbody>
          {sortedPokemonList.map((pokemon) => (
            <tr key={pokemon.id}>
              <td>{pokemon.id}</td>
              <td>{pokemon.name}</td>
              <td>{pokemon.height / 10} m</td>
              <td>{pokemon.weight / 10} kg</td>
            </tr>
          ))}
        </tbody>
      </table>
      <PokemonChart sortedPokemonList={sortedPokemonList} />
    </div>
  );
}

export default HomePage;
