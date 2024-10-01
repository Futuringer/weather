import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { calculateMovingAverage } from '../../../utils/helpers';

export const MovingAvgChart = ({ data, labels, step, theme }) => {
  const isDayTheme = theme === 'day';
  const textColor = isDayTheme ? 'rgba(0, 0, 0, 0.5)' : 'white';
  const gridColor = isDayTheme ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.4)';
  const movingAverageData = calculateMovingAverage(data.temperature, step);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Температура (°C)',
        data: data.temperature,
        borderColor: isDayTheme ? 'rgba(226,93,38, 0.7)' : 'rgba(255, 190, 0, 0.7)',
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.3,
        yAxisID: 'y1',
      },
      {
        label: 'Скользящая средняя температуры',
        data: movingAverageData,
        borderColor: isDayTheme ? 'rgba(10,74,99, 0.5)' : 'rgba(126,202,218, 0.8)',
        borderWidth: 2,
        pointRadius: 1,
        tension: 0.4,
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
        suggestedMax: Math.max(...data.temperature) + 5,
        suggestedMin: Math.min(...data.temperature) - 5,
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
        suggestedMax: Math.max(...data.temperature) + 5,
        suggestedMin: Math.min(...data.temperature) - 5,
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Скользящая средняя температуры',
          color: textColor,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
