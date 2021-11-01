import storyFilters from '../../filters/storyFilters';
import timeFilters from '../../filters/timeFilters';
import { Filter } from '../../filters/types';
import { Metadata, SelectedCharacterBonus } from '../../types';
import React from 'react';
import { MetadataContext } from '../../context/metadataContext';

const filterData = (
  data: SelectedCharacterBonus[],
  filters: Filter[],
  metadata: Metadata
): SelectedCharacterBonus[] => {
  const enabledFilters = filters.filter((f) => f.enabled);
  const fragmentFilters = filters.filter((f) => f.id.startsWith('fragment'));

  const enabledFragmentFilters = fragmentFilters.some((f) => f.enabled);

  let filterGroups = [timeFilters, storyFilters];
  if (enabledFragmentFilters) {
    filterGroups = [...filterGroups, fragmentFilters];
  }
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
  const [filteredData, setFilteredData] = React.useState<
    SelectedCharacterBonus[]
  >([]);

  React.useEffect(() => {
    if (data === undefined) {
      setFilteredData([]);
    } else if (filters === undefined || filters.length <= 0) {
      setFilteredData(data);
    } else {
      setFilteredData(filterData(data, filters, metadata));
    }
  }, [data, filters, metadata]);

  return filteredData;
};

export default useFilteredData;
