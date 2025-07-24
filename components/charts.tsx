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
