import { ResponsiveBar } from '@nivo/bar';
import React from 'react';
import { BarItem } from './types';

import filterColourMap from '../filters/filterColours';

const getKeys = (data: BarItem[]) => {
  const keys = data.flatMap((d) => Object.keys(d));
  return Array.from(new Set(keys)).filter((k) => k !== 'characterName');
};

const getColour = (bar: any) => {
  const { id } = bar;
  return filterColourMap[id];
};

const BarChart = React.memo(({ data }: { data: BarItem[] }) => {
  const keys = getKeys(data);
  return (
    <ResponsiveBar
      data={data}
      indexBy={'characterName'}
      keys={keys}
      margin={{ top: 10, right: 10, bottom: 80, left: 30 }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        format: (e) => {
          if (typeof e === 'number') {
            return Math.floor(e) === e ? e : '';
          }
          return '';
        },
      }}
      axisBottom={{
        tickValues: 3,
        tickRotation: -45,
        legendOffset: -80,
        legendPosition: 'start',
      }}
      valueScale={{ type: 'linear' }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      colors={getColour}
    />
  );
});

export default BarChart;
