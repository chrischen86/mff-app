import React from 'react';
import useFilteredData from '../../components/hooks/useFilteredData';
import { dimensionalClashdFilter } from '../../filters/storyFilters';
import { currentMonthFilter } from '../../filters/timeFilters';
import { SelectedCharacterBonus } from '../../types';

const LeaderTable = ({ data }: { data: SelectedCharacterBonus[] }) => {
  console.log('leader table');

  const filters = React.useMemo(() => {
    return [currentMonthFilter, dimensionalClashdFilter];
  }, []);
  const filteredData = useFilteredData(data, filters);
  console.log(filteredData);

  return <div>data</div>;
};

export default LeaderTable;
