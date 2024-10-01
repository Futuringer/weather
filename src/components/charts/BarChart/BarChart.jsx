import React from 'react';
import { Bar } from 'react-chartjs-2';

export const BarChart = ({ data, labels, theme }) => {
  const isDayTheme = theme === 'day';
  const textColor = isDayTheme ? 'rgba(0, 0, 0, 0.5)' : 'white';
  const gridColor = isDayTheme ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.4)';

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Температура (°C)',
        data: data.temperature || [],
        backgroundColor: isDayTheme ? 'rgba(226,93,38, 0.7)' : 'rgba(255, 190, 0, 0.7)',
        yAxisID: 'y1',
      },
      {
        label: 'Влажность (%)',
        data: data.humidity || [],
        backgroundColor: isDayTheme ? 'rgba(10,74,99, 0.5)' : 'rgba(126,202,218, 0.8)',
        yAxisID: 'y2',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: textColor } },
      tooltip: { enabled: true },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          mode: 'x',
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColor,
          maxTicksLimit: 18,
        },
        grid: {
          color: gridColor,
        },
      },
      y1: {
        type: 'linear',
        position: 'left',
        beginAtZero: true,
        suggestedMax: Math.max(...data.temperature) + 5,
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
        title: {
          display: true,
          text: 'Температура (°C)',
          color: textColor,
        },
      },
      y2: {
        type: 'linear',
        position: 'right',
        beginAtZero: true,
        suggestedMax: Math.max(...data.humidity) + 5,
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Влажность (%)',
          color: textColor,
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};
