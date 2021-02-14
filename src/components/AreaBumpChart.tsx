import React from 'react';
import { AreaBumpInputSerie, ResponsiveAreaBump } from '@nivo/bump';
import moment from 'moment';

const AreaBumpChart = ({
  areaBumpData,
}: {
  areaBumpData: AreaBumpInputSerie[];
}) => {
  return (
    <ResponsiveAreaBump
      data={areaBumpData}
      margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
      spacing={8}
      colors={{ scheme: 'nivo' }}
      blendMode="multiply"
      startLabel="id"
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: -36,
        format: function (value: string) {
          return moment(value).format('MMM YYYY');
        },
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendPosition: 'middle',
        legendOffset: 32,
        format: function (value: string) {
          return moment(value).format('MMM YYYY');
        },
      }}
    />
  );
};

export default AreaBumpChart;
