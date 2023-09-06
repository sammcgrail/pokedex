import React from "react";
import { Scatter } from "react-chartjs-2";

function getColorForType(type) {
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

  return colors[type.toLowerCase()] || "#000000";
}

function PokemonScatterChart({ sortedPokemonList }) {
  const data = {
    datasets: sortedPokemonList.map((pokemon) => ({
      label: pokemon.name,
      data: [
        {
          x: pokemon.height / 10,
          y: pokemon.weight / 10,
        },
      ],
      backgroundColor: getColorForType(pokemon.types[0].type.name),
      pointRadius: 5,
    })),
  };

  const options = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Height (m)",
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Weight (kg)",
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        title: (tooltipItems, data) => {
          return data.datasets[tooltipItems[0].datasetIndex].label;
        },
        label: (tooltipItem, data) => {
          const type =
            sortedPokemonList[tooltipItem.datasetIndex].types[0].type.name;
          return `Type: ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        },
      },
    },
    legend: {
      display: false,
    },
  };

  return (
    <div>
      <h3>Scatter Chart (Height vs Weight)</h3>
      <Scatter data={data} options={options} />
    </div>
  );
}

export default PokemonScatterChart;
