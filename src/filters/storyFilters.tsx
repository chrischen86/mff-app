import { SelectedCharacterBonus } from '../types';
import filterColourMap from './filterColours';
import { Filter } from './types';

const dimensionalClashdFilter: Filter = {
  id: 'dimensionalClash',
  label: 'Dimensional Clash',
  enabled: true,
  canDelete: true,
  predicate: (term: SelectedCharacterBonus) => {
    return term.stageId <= 20;
  },
  colour: filterColourMap['Dimensional Clash'],
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
  colour: filterColourMap['The True SHIELD'],
};
export { trueShieldFilter };

const allWarFilter: Filter = {
  id: 'allWar',
  label: 'The All War',
  enabled: true,
  canDelete: true,
  predicate: (term: SelectedCharacterBonus) => {
    return term.stageId >= 25 && term.stageId <= 28;
  },
  colour: filterColourMap['The All War'],
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
  colour: filterColourMap['The Future Ends Here'],
};
export { futureEndsHereFilter };

const storyFilters = [
  dimensionalClashdFilter,
  trueShieldFilter,
  allWarFilter,
  futureEndsHereFilter,
];
export default storyFilters;
