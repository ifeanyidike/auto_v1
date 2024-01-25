'use client';
import React from 'react';
import Chart from '~/components/Chart';

const labels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const data = [200, 401, 509, 702, 615, 506, 535, 450, 510, 627, 710, 605];
const caption = 'Monthly Sales';

const HomeChart = () => {
  return (
    <div className="h-full max-h-96 overflow-hidden">
      <Chart labels={labels} caption={caption} data={data} type="line" />
    </div>
  );
};

export default HomeChart;
