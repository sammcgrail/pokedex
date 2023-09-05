import React from "react";
import { Bar as BarChartComponent } from "react-chartjs-2";

function PokemonChart({ sortedPokemonList }) {
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
  const chartOptions = {
    indexAxis: "y",
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // light grid lines
        },
        ticks: {
          color: "#FFF", // white font color
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#FFF",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#FFF", // white font color for legend
        },
      },
    },
  };

  return <BarChartComponent data={chartData} options={chartOptions} />;
}

export default PokemonChart;
