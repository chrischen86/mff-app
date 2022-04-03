import { IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
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
    <Toolbar>
      <Typography
        variant="h6"
        id="tableTitle"
        component="div"
        className={classes.title}
      >
        {title}
      </Typography>

      <Tooltip title="Filter list">
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

export default TableToolbar;
