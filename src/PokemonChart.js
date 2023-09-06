import React from "react";
import { Bar as BarChartComponent, Scatter } from "react-chartjs-2";

function createBinnedData(sortedPokemonList, bins, key) {
  return bins.map((bin) => {
    const count = sortedPokemonList.filter((pokemon) => {
      const value =
        key === "height" ? pokemon.height / 10 : pokemon.weight / 10;
      return value >= bin.min && value < bin.max;
    }).length;
    return count;
  });
}

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

function getColorByType(type) {
  const colors = {
    Water: "#6890F0",
    Fire: "#F08030",
    Grass: "#78C850",
    Electric: "#F8D030",
    Psychic: "#F85888",
    Ice: "#98D8D8",
    Dragon: "#7038F8",
    Dark: "#705848",
    Fairy: "#EE99AC",
    Normal: "#A8A878",
    Fighting: "#C03028",
    Flying: "#A890F0",
    Poison: "#A040A0",
    Ground: "#E0C068",
    Rock: "#B8A038",
    Bug: "#A8B820",
    Ghost: "#705898",
    Steel: "#B8B8D0",
  };
  return colors[type] || "#000000";
}

function getScatterPlotData(sortedPokemonList) {
  return {
    datasets: sortedPokemonList.map((pokemon) => ({
      label: pokemon.types[0].type.name, // Use the type name instead of Pokémon name
      data: [{ x: pokemon.height / 10, y: pokemon.weight / 10 }],
      backgroundColor: getColorByType(pokemon.types[0].type.name),
      pointRadius: 5,
    })),
  };
}

function PokemonChart({ sortedPokemonList }) {
  const heightBins = [
    { label: "0-0.5m", min: 0, max: 0.5 },
    { label: "0.5-1m", min: 0.5, max: 1 },
    { label: "1-1.5m", min: 1, max: 1.5 },
    { label: "1.5-2m", min: 1.5, max: 2 },
    { label: "2m+", min: 2, max: Infinity },
  ];
  const weightBins = [
    { label: "0-10kg", min: 0, max: 10 },
    { label: "10-50kg", min: 10, max: 50 },
    { label: "50-100kg", min: 50, max: 100 },
    { label: "100kg+", min: 100, max: Infinity },
  ];

  const heightBinnedData = createBinnedData(
    sortedPokemonList,
    heightBins,
    "height"
  );
  const weightBinnedData = createBinnedData(
    sortedPokemonList,
    weightBins,
    "weight"
  );

  const binnedChartData = (data, label, bins, bgColor, borderColor) => ({
    labels: bins.map((bin) => bin.label),
    datasets: [
      {
        label: `Number of Pokémon (${label})`,
        data: data,
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  });

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

  const binnedChartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Bins",
          color: "#FFF",
        },
        ticks: {
          autoSkip: true,
          autoSkipPadding: 10,
          maxRotation: 90,
          minRotation: 90,
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Pokémon",
          color: "#FFF",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#FFF",
        },
      },
    },
  };

  const scatterPlotOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Height (m)",
          color: "#FFF",
        },
      },
      y: {
        title: {
          display: true,
          text: "Weight (kg)",
          color: "#FFF",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h3>Combined Chart</h3>
      <BarChartComponent
        data={getCombinedChartData(sortedPokemonList)}
        options={chartOptions}
      />
      <h3>Scatter Plot by Pokémon Type</h3>
      <Scatter
        data={getScatterPlotData(sortedPokemonList)}
        options={scatterPlotOptions}
      />
      <h3>Height Binned Chart</h3>
      <BarChartComponent
        data={binnedChartData(
          heightBinnedData,
          "Height",
          heightBins,
          "rgba(75, 192, 192, 0.6)",
          "rgba(75, 192, 192, 1)"
        )}
        options={binnedChartOptions}
      />
      <h3>Weight Binned Chart</h3>
      <BarChartComponent
        data={binnedChartData(
          weightBinnedData,
          "Weight",
          weightBins,
          "rgba(153, 102, 255, 0.6)",
          "rgba(153, 102, 255, 1)"
        )}
        options={binnedChartOptions}
      />
    </div>
  );
}

export default PokemonChart;
