import React from "react";
import { Bar as BarChartComponent, Scatter } from "react-chartjs-2";

function createBinnedData(sortedPokemonList, bins, key) {
  const binnedData = bins.map((bin) => ({
    label: bin.label,
    count: sortedPokemonList.filter(
      (pokemon) => pokemon[key] / 10 >= bin.min && pokemon[key] / 10 < bin.max
    ).length,
  }));
  return binnedData;
}

function getCombinedChartData(sortedPokemonList) {
  const heightData = sortedPokemonList.map((pokemon) => pokemon.height / 10);
  const weightData = sortedPokemonList.map((pokemon) => pokemon.weight / 10);
  return {
    labels: sortedPokemonList.map((pokemon) => pokemon.name),
    datasets: [
      {
        label: "Height (m)",
        data: heightData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Weight (kg)",
        data: weightData,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
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
  return colors[type];
}

function getScatterPlotData(sortedPokemonList) {
  const groupedByType = {};

  sortedPokemonList.forEach((pokemon) => {
    const type = pokemon.types[0].type.name;
    if (!groupedByType[type]) {
      groupedByType[type] = [];
    }
    groupedByType[type].push({
      x: pokemon.height / 10,
      y: pokemon.weight / 10,
    });
  });

  return {
    datasets: Object.keys(groupedByType).map((type) => ({
      label: type,
      data: groupedByType[type],
      backgroundColor: getColorByType(type),
      borderColor: getColorByType(type),
      pointRadius: 5,
    })),
  };
}

const scatterPlotOptions = {
  scales: {
    x: {
      type: "linear",
      position: "bottom",
    },
  },
  plugins: {
    legend: {
      labels: {
        usePointStyle: true,
        color: (context) => getColorByType(context.dataset.label),
      },
    },
  },
};

const binnedChartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

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

  const binnedChartData = (
    data,
    label,
    bins,
    backgroundColor,
    borderColor
  ) => ({
    labels: bins.map((bin) => bin.label),
    datasets: [
      {
        label: label,
        data: data.map((bin) => bin.count),
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  });

  return (
    <div>
      <h3>Combined Chart</h3>
      <BarChartComponent
        data={getCombinedChartData(sortedPokemonList)}
        options={scatterPlotOptions}
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
