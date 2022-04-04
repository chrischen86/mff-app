import { Grid } from '@material-ui/core';
import React from 'react';
import FilterSection from '../../components/FilterSection';
import GraphCard from '../../components/GraphCard';
import useFilteredData from '../../components/hooks/useFilteredData';
import RankTableCard from '../../components/RankTableCard';
import { FilterContext } from '../../context/filterContext';
import { SelectedCharacterBonus } from '../../types';

const StatsPage = ({
  data,
  isLoading,
}: {
  data: SelectedCharacterBonus[];
  isLoading: boolean;
}) => {
  //Contexts
  const { state: filterContext } = React.useContext(FilterContext);

  const filteredData = useFilteredData(data, filterContext.filters);
  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <FilterSection />
        </Grid>
        <Grid item xs={12} md={3}>
          <RankTableCard data={filteredData} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={9}>
          <GraphCard data={filteredData} isLoading={isLoading} />
        </Grid>
      </Grid>
    </>
  );
};

export default StatsPage;
