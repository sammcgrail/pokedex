import React, { useState, useEffect } from "react";
import PokemonChart from "./PokemonChart";
import { Link } from "react-router-dom";

function HomePage({ pokemonList }) {
  const [sortedPokemonList, setSortedPokemonList] = useState(pokemonList);
  const [sortingKey, setSortingKey] = useState("id");
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    let sortedList = [...pokemonList].sort((a, b) => {
      if (sortingKey === "name") {
        if (ascending) {
          return a[sortingKey].localeCompare(b[sortingKey]);
        } else {
          return b[sortingKey].localeCompare(a[sortingKey]);
        }
      } else {
        if (ascending) {
          return a[sortingKey] - b[sortingKey];
        } else {
          return b[sortingKey] - a[sortingKey];
        }
      }
    });
    setSortedPokemonList(sortedList);
  }, [pokemonList, sortingKey, ascending]);

  const handleSort = (key) => {
    setAscending((prev) => (key === sortingKey ? !prev : true));
    setSortingKey(key);
  };

  return (
    <div className="content-container">
      <div className="table-container">
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
                <td>
                  <Link to={`/pokemon/${pokemon.id}`}>{pokemon.name}</Link>
                </td>

                <td>{pokemon.height / 10} m</td>
                <td>{pokemon.weight / 10} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="chart-container">
        <PokemonChart sortedPokemonList={sortedPokemonList} />
      </div>
    </div>
  );
}

export default HomePage;
