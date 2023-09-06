export function createBinnedData(sortedPokemonList, bins, key) {
  return bins.map((bin) => {
    const count = sortedPokemonList.filter((pokemon) => {
      const value =
        key === "height" ? pokemon.height / 10 : pokemon.weight / 10;
      return value >= bin.min && value < bin.max;
    }).length;
    return count;
  });
}

export function binnedChartData(data, label, bins, bgColor, borderColor) {
  return {
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
  };
}

export const binnedChartOptions = {
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
