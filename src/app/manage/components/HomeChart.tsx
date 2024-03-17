'use client';
import React from 'react';
import Chart from '~/components/Chart';

type Props = {
  data: { [k: string]: number };
};

const HomeChart = (props: Props) => {
  const labels = Object.keys(props.data);
  const data = Object.values(props.data);

  return (
    <div className="h-full max-h-96 overflow-hidden">
      <Chart
        labels={labels}
        caption="Transactions by months"
        data={data.map(d => d / 100)}
        type="line"
      />
    </div>
  );
};

export default HomeChart;
