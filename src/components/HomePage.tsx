import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { FilterContext } from '../context/filterContext';
//import data from './__mocks__/data.json';
import filters from '../filters';
import FilterSection from './FilterSection';
import GraphCard from './GraphCard';
import useCharacterBonus from './hooks/useCharacterBonus';
import useFilteredData from './hooks/useFilteredData';
import RankTableCard from './RankTableCard';
import SiteAppBar from './SiteAppBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '1em',
    },
  })
);

const HomePage = () => {
  const { state: filterContext } = React.useContext(FilterContext);
  const { data, isLoading } = useCharacterBonus();
  const filteredData = useFilteredData(data, filterContext.filters);
  const classes = useStyles();

  return (
    <>
      <SiteAppBar />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <FilterSection filters={filters} />
          </Grid>
          <Grid item xs={12} md={3}>
            <RankTableCard data={filteredData} isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={9}>
            <GraphCard data={filteredData} isLoading={isLoading} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default HomePage;
