import { Chip, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { Filter } from '../filters/types';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: 'inherit',
    padding: 0,
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginTop: theme.spacing(-1),
    minHeight: 0,
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  chipHidden: {
    display: 'none',
  },
}));

const TableFilterSection = ({
  filters = [],
  onFilterClick,
}: {
  filters: Filter[];
  onFilterClick?: Function;
}) => {
  const classes = useStyles();

  const handleClick = (filter: Filter) => {
    if (onFilterClick !== undefined) {
      onFilterClick(filter);
    }
  };

  if (filters.length <= 0) {
    return null;
  }

  return (
    <Toolbar className={clsx(classes.toolbar)}>
      {filters.map((filter) => {
        return (
          <Chip
            key={filter.id}
            label={filter.label}
            className={clsx(classes.chip, filter.hidden && classes.chipHidden)}
            onClick={() => handleClick(filter)}
            color={filter.enabled ? 'primary' : undefined}
            size={'small'}
            style={{
              backgroundColor: filter.enabled ? filter.colour : undefined,
            }}
          />
        );
      })}
    </Toolbar>
  );
};

export default TableFilterSection;
