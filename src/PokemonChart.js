import React from "react";
import { Bar as BarChartComponent } from "react-chartjs-2";

function getCombinedChartData(sortedPokemonList) {
  return {
    labels: sortedPokemonList.map((pokemon) => pokemon.name),
    datasets: [
      {
        label: "Height (m)",
        data: sortedPokemonList.map((pokemon) => pokemon.height / 10),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        yAxisID: "y-axis-height",
      },
      {
        label: "Weight (kg)",
        data: sortedPokemonList.map((pokemon) => pokemon.weight / 10),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
        yAxisID: "y-axis-weight",
      },
    ],
  };
}

const chartOptions = {
  scales: {
    x: {
      title: {
        display: true,
        text: "Pokémon Name",
        color: "#FFF",
      },
      ticks: {
        font: {
          size: 4, // Adjust this value to fit the labels better
        },
        autoSkip: false, // This will show all labels, adjust font size to make them fit
        autoSkipPadding: 10, // Adjust the padding as needed
        maxRotation: 90,
        minRotation: 90,
      },
    },
    yAxes: [
      {
        id: "y-axis-height",
        position: "left",
        title: {
          display: true,
          text: "Height (m)",
          color: "#FFF",
        },
        ticks: {
          callback: function (value) {
            return `${value} m`; // Adds 'm' as the unit to each tick
          },
        },
      },
      {
        id: "y-axis-weight",
        position: "right",
        title: {
          display: true,
          text: "Weight (kg)",
          color: "#FFF",
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function (value) {
            return `${value} kg`; // Adds 'kg' as the unit to each tick
          },
        },
      },
    ],

    plugins: {
      legend: {
        labels: {
          color: "#FFF",
        },
      },
    },
  },
};

function PokemonChart({ sortedPokemonList }) {
  return (
    <div>
      <h3>Combined Chart</h3>
      <BarChartComponent
        data={getCombinedChartData(sortedPokemonList)}
        options={chartOptions}
      />
    </div>
  );
}

export default PokemonChart;
