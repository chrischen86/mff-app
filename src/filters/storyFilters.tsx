import { SelectedCharacterBonus } from '../types';
import { Filter } from './types';

const allWarFilter: Filter = {
  predicate: (term: SelectedCharacterBonus) => {
    return term.stageId >= 25;
  },
};
export { allWarFilter };

const storyFilters = [allWarFilter];
export default storyFilters;
