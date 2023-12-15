"use client";

import { Skills } from "./SearchResults";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

type BarChartProps = {
  skills: Skills[];
};

const BarChart = ({ skills }: BarChartProps) => {
  const data = {
    labels: skills.map((skill) => skill.skillName),
    datasets: [
      {
        data: skills.map((skill) => skill.percentage),
        backgroundColor: "#991b1b",
        borderColor: "gray",
        borderWidth: 0,
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: "#E6E6E6",
        align: "start" as const,
        anchor: "end" as const,
        font: {
          size: 15,
          weight: "bold" as const,
        },
        formatter: (value: number, context: any) => {
          return `${value.toFixed(2)}%`;
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          color: "#FFF",
          font: {
            size: 15,
          },
        },
      },
    },
  };

  const calculateChartHeight = () => {
    const heightPerSkill = 45;
    const containerHeight = skills.length * heightPerSkill;
    return containerHeight;
  };

  return (
    <div style={{ height: calculateChartHeight(), maxWidth: "800px" }}>
      <Bar data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default BarChart;
