import { SelectedCharacterBonus } from '../types';
import { Filter } from './types';

const currentMonthFilter: Filter = {
  id: 'currentMonth',
  label: 'Current Month',
  enabled: true,
  canDelete: false,
  predicate: (term: SelectedCharacterBonus) => {
    const theDate = new Date(term.date);
    const today = new Date();
    return theDate.getMonth() === today.getMonth();
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
