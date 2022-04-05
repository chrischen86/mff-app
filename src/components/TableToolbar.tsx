import { Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}));

const TableToolbar = ({ title }: { title: string }) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar className={classes.root}>
      <Typography
        variant="h5"
        id="tableTitle"
        component="div"
        className={classes.title}
      >
        {title}
      </Typography>
    </Toolbar>
  );
};

export default TableToolbar;
