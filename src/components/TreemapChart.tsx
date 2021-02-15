import React from 'react';
import { ResponsiveTreeMap } from '@nivo/treemap';
import { TreemapItem } from './types';

const TreemapChart = React.memo(({ data }: { data: TreemapItem }) => {
  return (
    <ResponsiveTreeMap
      data={data}
      identity="name"
      value="loc"
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      label="id"
      labelSkipSize={50}
      labelTextColor="black"
    />
  );
});

export default TreemapChart;
