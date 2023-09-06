import React from "react";
import { Bar as BarChartComponent } from "react-chartjs-2";
import { createBinnedData, binnedChartData, binnedChartOptions } from "./utils";

function HeightBinnedChart({ sortedPokemonList }) {
  const heightBins = [
    { label: "0-0.5m", min: 0, max: 0.5 },
    { label: "0.5-1m", min: 0.5, max: 1 },
    { label: "1-1.5m", min: 1, max: 1.5 },
    { label: "1.5-2m", min: 1.5, max: 2 },
    { label: "2m+", min: 2, max: Infinity },
  ];

  const heightBinnedData = createBinnedData(
    sortedPokemonList,
    heightBins,
    "height"
  );

  return (
    <div>
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
    </div>
  );
}

export default HeightBinnedChart;
