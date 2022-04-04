import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
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

const SiteAppBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}></Typography>
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
