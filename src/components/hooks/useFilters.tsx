import React from 'react';
import { Filter } from '../../filters/types';

const setFilterState = (
  filters: Filter[],
  filterId: string,
  filterDisabled: boolean = false
) => {
  const filter = filters.find((f) => f.id === filterId);
  if (filter === undefined) {
    return filters;
  }

  return filters.map((f) => {
    return f.id === filterId
      ? {
          ...f,
          enabled: !filterDisabled,
        }
      : f;
  });
};

const useFilters = () => {
  const [filters, setFilters] = React.useState<Filter[]>([]);

  const enableFilter = React.useCallback(
    (filterId: string) => {
      setFilters(setFilterState(filters, filterId, false));
    },
    [filters]
  );

  const disableFilter = React.useCallback(
    (filterId: string) => {
      setFilters(setFilterState(filters, filterId, true));
    },
    [filters]
  );

  return { filters, setFilters, enableFilter, disableFilter };
};

export default useFilters;
