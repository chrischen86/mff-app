import { SelectedCharacterBonus } from '../types';
import { Filter } from './types';

const currentMonthFilter: Filter = {
  predicate: (term: SelectedCharacterBonus) => {
    return true;
  },
};
export { currentMonthFilter };

const timeFilters = [currentMonthFilter];
export default timeFilters;
