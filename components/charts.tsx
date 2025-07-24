import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

export function getDoughnut(data: any) {
  return {
    labels: data.map((item: any) => item.name),
    datasets: [
      {
        label: "Total",
        data: data.map((item: any) => item.totalEstimatedCost),
        backgroundColor: [
          "086788",
          "07a0c3",
          "f0c808",
          "fff1d0",
          "dd1c1a",
          "542344",
          "bfd1e5",
          "ebf5ee",
          "d8bfaa",
          "808080",
        ],
      },
    ],
  };
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Trip Cost Chart",
    },
  },
};
