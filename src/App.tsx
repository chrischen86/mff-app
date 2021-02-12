import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import SiteAppBar from './components/SiteAppBar';
import RankTableCard from './components/RankTableCard';
import data from './__mocks__/data.json';
import GraphCard from './components/GraphCard';

const topBonusesData = Array.from(
  data.reduce((acc, val) => {
    const currentCount = acc.get(val.characterId);
    acc.set(val.characterId, currentCount ? currentCount + 1 : 1);
    return acc;
  }, new Map<string, number>()),
  ([key, value]) => ({ characterName: key, count: value })
).sort((a, b) => b.count - a.count);

const topTenCharacters = topBonusesData
  .slice(0, 10)
  .map((c) => c.characterName);

const rankBonusesData = Array.from(
  data.reduce((acc, val) => {
    if (topTenCharacters.indexOf(val.characterId) <= 0) {
      return acc;
    }

    const usageData = acc.get(val.characterId);

    if (usageData === undefined) {
      acc.set(val.characterId, [
        {
          x: val.date,
          y: 1,
        },
      ]);
    } else {
      const dataPoint = usageData.filter((d) => d.x === val.date);
      if (dataPoint.length === 0) {
        acc.set(val.characterId, [
          ...usageData.filter((d) => d.x !== val.date),
          { x: val.date, y: 1 },
        ]);
      } else if (dataPoint.length === 1) {
        acc.set(val.characterId, [
          ...usageData.filter((d) => d.x !== val.date),
          { x: val.date, y: dataPoint[0].y + 1 },
        ]);
      }
    }

    return acc;
  }, new Map<string, { x: string; y: number }[]>()),
  ([key, value]) => ({ id: key, data: value })
);

console.log(rankBonusesData);

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
          <Grid item xs={12} md={3}>
            <RankTableCard bonuses={topBonusesData} />
          </Grid>
          <Grid item xs={12} md={9}>
            <GraphCard data={rankBonusesData} />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default App;
