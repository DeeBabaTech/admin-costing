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
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(173,255,47)",
          "rgba(255, 205, 86)",
          "rgba(153, 102, 255)",
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
