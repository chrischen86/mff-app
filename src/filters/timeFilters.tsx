import { Metadata, SelectedCharacterBonus } from '../types';
import { Filter } from './types';

const currentMonthFilter: Filter = {
  id: 'currentMonth',
  label: 'Current Month',
  enabled: true,
  canDelete: false,
  predicate: (term: SelectedCharacterBonus, metadata: Metadata) => {
    const theDate = new Date(term.date);
    const current =
      metadata.currentMonth === undefined
        ? new Date()
        : new Date(metadata.currentMonth);

    return (
      theDate.getMonth() === current.getMonth() &&
      theDate.getFullYear() === current.getFullYear()
    );
  },
};
export { currentMonthFilter };

const allTimeFilter: Filter = {
  id: 'allTime',
  label: 'All Time',
  enabled: false,
  canDelete: false,
  predicate: (term: SelectedCharacterBonus) => {
    return true;
  },
};
export { allTimeFilter };
const timeFilters = [currentMonthFilter, allTimeFilter];
export default timeFilters;
