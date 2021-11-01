import { Toolbar, IconButton, Chip } from '@material-ui/core';
import React from 'react';
import { Filter } from '../filters/types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import FilterIcon from '@material-ui/icons/FilterList';
import { FilterContext } from '../context/filterContext';
import timeFilters from '../filters/timeFilters';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    transition: theme.transitions.create(
      ['padding', 'min-height', 'background-color'],
      {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.short,
      }
    ),
    position: 'sticky',
  },
  toolbarHidden: {
    backgroundColor: 'inherit',
    padding: 0,
    paddingLeft: theme.spacing(0.5),
    minHeight: 0,
    transition: theme.transitions.create(
      ['padding', 'min-height', 'background-color'],
      {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.short,
      }
    ),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  chipHidden: {
    display: 'none',
  },
}));

const FilterSection = ({ visible = false }: { visible?: boolean }) => {
  const [isVisible, setIsVisible] = React.useState(visible);
  const { state, dispatch } = React.useContext(FilterContext);
  const classes = useStyles();

  const handleDelete = (chipId: string) => {
    dispatch({
      type: 'disable',
      filterId: chipId,
    });
  };

  const handleClick = (filter: Filter) => {
    if (timeFilters.find((f) => f.id === filter.id)) {
      const others = timeFilters.filter((f) => f.id !== filter.id);
      others.forEach((f) => {
        dispatch({
          type: filter.enabled ? 'enable' : 'disable',
          filterId: f.id,
        });
      });
    }
    dispatch({
      type: filter.enabled ? 'disable' : 'enable',
      filterId: filter.id,
    });
  };

  if (!isVisible && state.filters.length <= 0) {
    return null;
  }

  return (
    <Toolbar
      className={clsx(classes.toolbar, !isVisible && classes.toolbarHidden)}
    >
      <IconButton onClick={() => setIsVisible(!isVisible)}>
        <FilterIcon />
      </IconButton>
      {state.filters?.map((filter) => {
        return (
          <Chip
            key={filter.id}
            label={filter.label}
            className={clsx(
              classes.chip,
              !isVisible && !filter.enabled && classes.chipHidden
            )}
            onDelete={
              !isVisible && filter.canDelete
                ? () => handleDelete(filter.id)
                : undefined
            }
            onClick={isVisible ? () => handleClick(filter) : undefined}
            color={filter.enabled ? 'primary' : undefined}
            size={isVisible ? 'medium' : 'small'}
            style={{
              backgroundColor: filter.enabled ? filter.colour : undefined,
            }}
          />
        );
      })}
    </Toolbar>
  );
};

export default FilterSection;
