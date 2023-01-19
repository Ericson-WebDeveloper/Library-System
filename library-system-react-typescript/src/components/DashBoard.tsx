import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

type DashBoardProps = {
  counts: number[];
  labels: string[];
};
ChartJS.register(ArcElement, Tooltip, Legend);
const DashBoard = ({ counts, labels }: DashBoardProps) => {
  const data = {
    labels: [...labels],
    datasets: [
      {
        label: "#",
        data: [...counts],
        backgroundColor: [
          "rgba(60, 53, 254, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(81, 254, 53, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(254, 172, 53, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 65, 134, 0.2)",
          "rgba(253, 65, 255, 0.2)",
          "rgba(255, 99, 65, 0.2)",
          "rgba(233, 255, 65, 0.2)",
          "rgba(39, 245, 204, 0.2)",
        ],
        borderColor: [
          "rgba(60, 53, 254, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(81, 254, 53, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(254, 172, 53, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 65, 134, 1)",
          "rgba(253, 65, 255, 1)",
          "rgba(255, 99, 65, 1)",
          "rgba(233, 255, 65, 1)",
          "rgba(39, 245, 204, 1)",
        ],
        borderWidth: 1,
        // options: {
        //   scale: {
        //       // Hides the scale

        //   },
        //   responsive: false
        // }
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      options={{
        maintainAspectRatio: false,
      }}
      width={600}
    />
  );
};

export default DashBoard;
