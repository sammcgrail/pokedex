import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PokemonDetails from "./Pokemondetails";
import { Chart, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar as BarChartComponent } from "react-chartjs-2";

Chart.register(BarElement, CategoryScale, LinearScale);

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

  const chartData = {
    labels: sortedPokemonList.map((pokemon) => pokemon.name),
    datasets: [
      {
        label: "Height (m)",
        data: sortedPokemonList.map((pokemon) => pokemon.height / 10),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Weight (kg)",
        data: sortedPokemonList.map((pokemon) => pokemon.weight / 10),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
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
      <BarChartComponent
        data={chartData}
        options={{
          indexAxis: "y",
          scales: {
            x: {
              type: "linear",
              position: "bottom",
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}

export default App;
