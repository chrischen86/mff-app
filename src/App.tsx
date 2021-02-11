import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SiteAppBar from './components/SiteAppBar';
import TopBonusesCard from './components/TopBonusesCard';
import data from './__mocks__/data.json';

const topBonusesData = Array.from(
  data.reduce((acc, val) => {
    const currentCount = acc.get(val.characterId);
    acc.set(val.characterId, currentCount ? currentCount + 1 : 1);
    return acc;
  }, new Map<string, number>()),
  ([key, value]) => ({ characterName: key, count: value })
).sort((a, b) => b.count - a.count);

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
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TopBonusesCard bonuses={topBonusesData} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
