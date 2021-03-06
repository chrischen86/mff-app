import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import SiteAppBar from '../components/SiteAppBar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StoryPage from './story/StoryPage';
import ConquestPage from './conquest/ConquestPage';

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
    <Router basename="/mff-app">
      <SiteAppBar />
      <div className={classes.root}>
        <Switch>
          <Route path="/story">
            <StoryPage />
          </Route>
          <Route path="/conquest">
            <ConquestPage />
          </Route>
          <Route path="/">
            <div>Home Page</div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default HomePage;
