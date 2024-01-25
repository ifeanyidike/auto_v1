import React from 'react';
import Chart from '~/components/Chart';

const borderColor = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];
const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const backgroundColor = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
];

const data = [20, 41, 59, 72, 65, 56];
const caption = 'Monthly Sales';

const HomePieChart = () => {
  return (
    <Chart
      borderColor={borderColor}
      backgroundColor={backgroundColor}
      labels={labels}
      caption={caption}
      data={data}
      type="pie"
    />
  );
};

export default HomePieChart;
