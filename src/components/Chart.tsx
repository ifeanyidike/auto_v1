'use client';
import React from 'react';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartElement,
  Legend,
  LineElement,
  PointElement,
  Tooltip,
  LinearScale,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';

ChartElement.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
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
    backgroundColor = 'rgb(70, 8, 173)',
  } = props;
  const data = {
    ...(props.labels && { labels: props.labels }),
    datasets: [
      {
        label: props.caption,
        data: props.data,
        fill: false,
        borderColor,
        backgroundColor,
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
        type: 'linear',
        beginAtZero: false,
        grid: {
          display: false,
        },
      },
      x: {
        type: 'category',
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
      ) : props.type === 'bar' ? (
        <Bar
          data={data}
          options={{ ...options }}
          // style={{ backgroundColor: props.backgroundColor }}
        />
      ) : null}
    </div>
  );
};

export default Chart;
