import { SelectedCharacterBonus } from '../types';
import { Filter } from './types';

const dimensionalClashdFilter: Filter = {
  id: 'dimensionalClash',
  label: 'Dimensional Clash',
  enabled: false,
  canDelete: true,
  predicate: (term: SelectedCharacterBonus) => {
    return term.stageId <= 20;
  },
};
export { dimensionalClashdFilter };

const trueShieldFilter: Filter = {
  id: 'trueShield',
  label: 'The True SHIELD',
  enabled: true,
  canDelete: true,
  predicate: (term: SelectedCharacterBonus) => {
    return term.stageId >= 21 && term.stageId <= 24;
  },
};
export { trueShieldFilter };

const allWarFilter: Filter = {
  id: 'allWar',
  label: 'The All-War',
  enabled: true,
  canDelete: true,
  predicate: (term: SelectedCharacterBonus) => {
    return term.stageId >= 25 && term.stageId <= 28;
  },
};
export { allWarFilter };

const futureEndsHereFilter: Filter = {
  id: 'futureEndsHere',
  label: 'The Future Ends Here',
  enabled: true,
  canDelete: true,
  predicate: (term: SelectedCharacterBonus) => {
    return term.stageId >= 29;
  },
};
export { futureEndsHereFilter };

const storyFilters = [
  dimensionalClashdFilter,
  trueShieldFilter,
  allWarFilter,
  futureEndsHereFilter,
];
export default storyFilters;
