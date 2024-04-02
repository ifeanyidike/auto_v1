'use client';
import React from 'react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartElement,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  registerables,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';

ChartElement.register(
  // LinearScale,
  // CategoryScale,
  // PointElement,
  // LineElement,
  // BarElement,
  // ArcElement,
  // Tooltip,
  // Legend
  ...registerables
);

type Props = {
  height?: string;
  labels?: string[];
  data: number[];
  caption: string;
  type: 'line' | 'pie' | 'bar';
  borderColor?: string | string[];
  borderWidth?: number;
  backgroundColor?: string | string[];
};
const Chart = (props: Props) => {
  const {
    borderColor = [
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)',
    ],
    borderWidth = 2,
  } = props;
  const data = {
    ...(props.labels && { labels: props.labels }),
    datasets: [
      {
        label: props.caption,
        data: props.data,
        fill: false,
        borderColor,
        borderWidth,
        tension: 0.1,
        spanGaps: true,
        ...(props.backgroundColor && {
          backgroundColor: props.backgroundColor,
        }),
      },
    ],
  };

  // Configuration options for the chart
  const options: any = {
    animations: {
      radius: {
        duration: 400,
        easing: 'linear',
      },
    },
    hoverRadius: 12,
    hoverBackgroundColor: 'yellow',

    plugins: {
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
  const pieOptions: any = {
    animations: {
      radius: {
        duration: 400,
        easing: 'linear',
      },
    },
    maintainAspectRatio: false,
    plugins: {},
    scales: {
      display: false,
      y: {
        beginAtZero: false,
        display: false,
      },
    },
  };

  return (
    <div className="h-full">
      {props.type === 'line' ? (
        <Line data={data} style={{ height: '100%' }} options={{ ...options }} />
      ) : props.type === 'pie' ? (
        <Pie data={data} options={{ ...pieOptions }} />
      ) : null}
    </div>
  );
};

export default Chart;
