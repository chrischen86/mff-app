import { Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { useQuery } from 'react-query';
import FilterSection from './FilterSection';
import GraphCard from './GraphCard';
import RankTableCard from './RankTableCard';
import SiteAppBar from './SiteAppBar';
//import data from './__mocks__/data.json';
import filters from '../filters';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '1em',
    },
  })
);

const useCharacterBonus = () => {
  return useQuery(
    'characterBonus',
    async () => {
      const res = await fetch(
        'https://chrischen86.github.io/mff-data/selectedcharacterbonus.json'
      );
      return res.json();
    },
    { notifyOnChangeProps: ['data', 'error'] }
  );
};

const HomePage = () => {
  const { status, data, error, isLoading, isFetching } = useCharacterBonus();
  const classes = useStyles();

  if (isLoading) {
    return <div>Loading... </div>;
  }

  return (
    <>
      <SiteAppBar />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <FilterSection filters={filters} />
          </Grid>
          <Grid item xs={12} md={3}>
            <RankTableCard data={data} />
          </Grid>
          <Grid item xs={12} md={9}>
            <GraphCard data={data} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default HomePage;
