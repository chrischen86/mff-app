import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import BarChartIcon from '@material-ui/icons/BarChart';
import GitHubIcon from '@material-ui/icons/GitHub';
import GroupIcon from '@material-ui/icons/Group';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    color: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));

const SiteAppBar = ({ title = '' }: { title?: string }) => {
  const classes = useStyles();
  const showTextButtons = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('sm')
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {!showTextButtons && (
          <>
            <IconButton
              component={RouterLink}
              to={'/'}
              className={classes.button}
            >
              <BarChartIcon />
            </IconButton>
            <IconButton
              component={RouterLink}
              to={'/autoplay'}
              className={classes.button}
            >
              <PlayArrowIcon />
            </IconButton>
            <IconButton
              component={RouterLink}
              to={'/manage'}
              className={classes.button}
            >
              <GroupIcon />
            </IconButton>
          </>
        )}
        {showTextButtons && (
          <>
            <Button
              component={RouterLink}
              to={'/'}
              variant={'text'}
              className={classes.button}
              size={'large'}
            >
              Stats
            </Button>
            <Button
              component={RouterLink}
              to={'/autoplay'}
              variant={'text'}
              className={classes.button}
              size={'large'}
            >
              Autoplay
            </Button>
            <Button
              component={RouterLink}
              to={'/manage'}
              variant={'text'}
              className={classes.button}
              size={'large'}
            >
              Manage
            </Button>
          </>
        )}
        <IconButton
          color="inherit"
          target="_blank"
          href={'https://github.com/chrischen86/mff-app'}
        >
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default SiteAppBar;
