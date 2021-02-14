import storyFilters from '../../filters/storyFilters';
import timeFilters from '../../filters/timeFilters';
import { Filter } from '../../filters/types';
import { SelectedCharacterBonus } from '../../types';

const filterGroups = [timeFilters, storyFilters];

const filterData = (
  data: SelectedCharacterBonus[],
  filters: Filter[]
): SelectedCharacterBonus[] => {
  const enabledFilters = filters.filter((f) => f.enabled);
  const filteredData = data.filter((d) =>
    filterGroups.every((fg) =>
      fg
        .filter((f) => enabledFilters?.find((ef) => ef.id === f.id))
        .some((f) => f.predicate(d))
    )
  );

  return filteredData;
};

const useFilteredData = (
  data: SelectedCharacterBonus[],
  filters?: Filter[]
): SelectedCharacterBonus[] => {
  if (filters === undefined || filters.length <= 0) {
    return data;
  }
  const filteredData = filterData(data, filters);
  return filteredData;
};

export default useFilteredData;
