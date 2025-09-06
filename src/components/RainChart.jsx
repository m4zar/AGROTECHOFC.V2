import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function RainChart({ data }) {
  // Formatear labels das horas
  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.getHours() + 'h';
  };

  const chartData = {
    labels: data.times.map(time => formatTime(time)),
    datasets: [
      {
        label: 'Precipitação (mm/h)',
        data: data.precipitation,
        borderColor: '#3B82F6', // Azul
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#2563EB',
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#3B82F6',
        borderWidth: 1,
        callbacks: {
          title: function(context) {
            return `${context[0].label}`;
          },
          label: function(context) {
            return `🌧️ ${context.parsed.y.toFixed(1)} mm/h`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: '#6b7280'
        }
      },
      y: {
        display: true,
        min: 0,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: '#6b7280',
          callback: function(value) {
            return value + ' mm/h';
          }
        }
      }
    },
    elements: {
      line: {
        borderWidth: 3
      }
    }
  };

  return (
    <div className="h-full w-full">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default RainChart;
