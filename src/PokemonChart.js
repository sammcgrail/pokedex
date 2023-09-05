import React from "react";
import { Bar as BarChartComponent } from "react-chartjs-2";

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

  return (
    <div>
      <h3>Combined Chart</h3>
      <BarChartComponent
        data={getCombinedChartData(sortedPokemonList)}
        options={chartOptions}
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
        options={chartOptions}
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
        options={chartOptions}
      />
    </div>
  );
}

export default PokemonChart;
