import { SelectedCharacterBonus, StoryFragment } from '../types';
import filterColourMap from './filterColours';
import { Filter } from './types';

const createFragmentFilters = (fragments: StoryFragment[]): Filter[] => {
  return fragments
    .sort((a, b) => a.id - b.id)
    .map((f) => {
      const colour = filterColourMap[f.story];
      return {
        id: `fragmentFilter${f.id}`,
        label: `${f.story} #${f.fragment}`,
        enabled: false,
        canDelete: true,
        predicate: (term: SelectedCharacterBonus, data?: any) => {
          return f.stageIds.includes(term.stageId);
        },
        colour,
      };
    });
};

export { createFragmentFilters };
