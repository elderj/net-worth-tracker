import React from "react";
//For some reason this needs to be here
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Net Worth",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 2500, 5000, 2200, 2022, 3000, 4500],
    },
  ],
};

function MainChart() {
  return (
    <div>
      <p>Charts</p>
      <Line data={data} />
    </div>
  );
}

export default MainChart;
