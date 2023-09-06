import React, { useState } from "react";
import { Scatter } from "react-chartjs-2";

const colors = {
  water: "#6890F0",
  fire: "#F08030",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
};

function getColorForType(type) {
  return colors[type?.toLowerCase()] || "#000000";
}

function PokemonScatterChart({ sortedPokemonList }) {
  const [hiddenTypes, setHiddenTypes] = useState([]);

  const toggleTypeVisibility = (type) => {
    if (hiddenTypes.includes(type)) {
      setHiddenTypes((prevTypes) => prevTypes.filter((t) => t !== type));
    } else {
      setHiddenTypes((prevTypes) => [...prevTypes, type]);
    }
  };

  const isVisible = (pokemonType) => !hiddenTypes.includes(pokemonType);

  const data = {
    labels: sortedPokemonList.map((pokemon) => pokemon.name),
    datasets: [
      {
        label: "Pokemons",
        data: sortedPokemonList
          .filter((pokemon) => isVisible(pokemon.types[0].type.name))
          .map((pokemon) => ({
            x: pokemon.height / 10,
            y: pokemon.weight / 10,
          })),
        backgroundColor: sortedPokemonList
          .filter((pokemon) => isVisible(pokemon.types[0].type.name))
          .map((pokemon) => getColorForType(pokemon.types[0].type.name)),
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: "logarithmic",
          position: "bottom",
          ticks: {
            callback: (value) => Number(value.toString()),
          },
          scaleLabel: {
            display: true,
            labelString: "Height (m)",
          },
        },
      ],
      yAxes: [
        {
          type: "logarithmic",
          ticks: {
            callback: (value) => Number(value.toString()),
          },
          scaleLabel: {
            display: true,
            labelString: "Weight (kg)",
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        title: (tooltipItems, data) => data.labels[tooltipItems[0].index],
        label: (tooltipItem) => {
          const index = tooltipItem.index;
          const type = sortedPokemonList[index].types[0].type.name;
          return `Type: ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        },
      },
    },
    legend: {
      display: false,
    },
  };

  const colorEntries = Object.entries(colors);
  const midPoint = Math.ceil(colorEntries.length / 2);
  const firstRow = colorEntries.slice(0, midPoint);
  const secondRow = colorEntries.slice(midPoint);

  return (
    <div>
      <h3>Scatter Chart (Height vs Weight - Grouped by Type)</h3>
      <Scatter data={data} options={options} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          {firstRow.map(([type, color]) => (
            <div
              key={type}
              style={{
                margin: "0 10px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => toggleTypeVisibility(type)}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: color,
                  marginRight: "5px",
                  opacity: hiddenTypes.includes(type) ? 0.3 : 1,
                }}
              ></div>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {secondRow.map(([type, color]) => (
            <div
              key={type}
              style={{
                margin: "0 10px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => toggleTypeVisibility(type)}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: color,
                  marginRight: "5px",
                  opacity: hiddenTypes.includes(type) ? 0.3 : 1,
                }}
              ></div>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonScatterChart;
