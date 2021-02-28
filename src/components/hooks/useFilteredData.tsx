import storyFilters from '../../filters/storyFilters';
import timeFilters from '../../filters/timeFilters';
import { Filter } from '../../filters/types';
import { Metadata, SelectedCharacterBonus } from '../../types';
import React from 'react';
import { MetadataContext } from '../../context/metadataContext';

const filterGroups = [timeFilters, storyFilters];

const filterData = (
  data: SelectedCharacterBonus[],
  filters: Filter[],
  metadata: Metadata
): SelectedCharacterBonus[] => {
  const enabledFilters = filters.filter((f) => f.enabled);
  const filteredData = data.filter((d) =>
    filterGroups.every((fg) =>
      fg
        .filter((f) => enabledFilters?.find((ef) => ef.id === f.id))
        .some((f) => f.predicate(d, metadata))
    )
  );

  return filteredData;
};

const useFilteredData = (
  data?: SelectedCharacterBonus[],
  filters?: Filter[]
): SelectedCharacterBonus[] => {
  const { state: metadata } = React.useContext(MetadataContext);

  if (data === undefined) {
    return [];
  }

  if (filters === undefined || filters.length <= 0) {
    return data;
  }

  const filteredData = filterData(data, filters, metadata);
  return filteredData;
};

export default useFilteredData;
