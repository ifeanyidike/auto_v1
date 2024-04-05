'use client';
import React from 'react';
import Chart from '~/components/Chart';

type Props = {
  data: { [k: string]: number };
};

const HomeChart = (props: Props) => {
  const labels = props.data ? Object.keys(props.data) : [];
  const data = props.data ? Object.values(props.data) : [];

  return (
    <div className="h-full max-h-96 max-lg:max-h-[500px] max-lg:h-[500px] overflow-hidden">
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
