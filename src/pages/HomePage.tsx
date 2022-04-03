import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SiteAppBar from '../components/SiteAppBar';
import AutoplayPage from './autoplay/AutoplayPage';
import StatsPage from './stats/StatsPage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: '1em',
    },
  })
);

const HomePage = () => {
  const classes = useStyles();

  return (
    <>
      <SiteAppBar />
      <div className={classes.root}>
        <Routes>
          <Route path="/" element={<StatsPage />} />
          <Route path="/autoplay" element={<AutoplayPage />} />
        </Routes>
      </div>
    </>
  );
};

export default HomePage;
