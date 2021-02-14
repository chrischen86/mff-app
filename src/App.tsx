import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SiteAppBar from './components/SiteAppBar';
import RankTableCard from './components/RankTableCard';
import data from './__mocks__/data.json';
import GraphCard from './components/GraphCard';
import filters from './filters';
import FilterSection from './components/FilterSection';
import FilterProvider from './context/filterContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '1em',
    },
  })
);

function App() {
  /*
  useEffect(() => {
    fetch('https://chrischen86.github.io/mff-data/stages.json')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
*/
  const classes = useStyles();

  return (
    <>
      <SiteAppBar />
      <FilterProvider>
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
      </FilterProvider>
    </>
  );
}

export default App;
