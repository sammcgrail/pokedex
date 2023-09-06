import React from "react";
import { Bar as BarChartComponent } from "react-chartjs-2";
import { createBinnedData, binnedChartData, binnedChartOptions } from "./utils";

function WeightBinnedChart({ sortedPokemonList }) {
  const weightBins = [
    { label: "0-10kg", min: 0, max: 10 },
    { label: "10-50kg", min: 10, max: 50 },
    { label: "50-100kg", min: 50, max: 100 },
    { label: "100kg+", min: 100, max: Infinity },
  ];

  const weightBinnedData = createBinnedData(
    sortedPokemonList,
    weightBins,
    "weight"
  );

  return (
    <div>
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

export default WeightBinnedChart;
