import {
  Character,
  Stage,
  SelectedCharacterBonus,
  Metadata,
  StoryFragment,
} from '../types';
import createCtx from './createCtx';

const initialState: Metadata = {
  stages: [],
  characters: [],
  stories: [],
  fragments: [],
  currentMonth: undefined,
};

type MetadataState = typeof initialState;
type Action =
  | { type: 'setStages'; stages: Stage[] }
  | { type: 'setCharacters'; characters: Character[] }
  | { type: 'setFragments'; fragments: StoryFragment[] }
  | { type: 'calculateLastMonth'; data: SelectedCharacterBonus[] };

const reducer = (state: MetadataState, action: Action): MetadataState => {
  switch (action.type) {
    case 'setStages':
      return {
        ...state,
        stages: action.stages,
      };
    case 'setCharacters':
      return {
        ...state,
        characters: action.characters,
      };
    case 'setFragments':
      return {
        ...state,
        fragments: action.fragments,
      };
    case 'calculateLastMonth': {
      if (action.data === undefined) {
        return state;
      }
      const distinctDates = action.data
        .filter((d, i, arr) => arr.findIndex((t) => t.date === d.date) === i)
        .map((d) => new Date(d.date))
        .sort((a, b) => {
          return a.getTime() - b.getTime();
        });

      return {
        ...state,
        currentMonth: distinctDates[distinctDates.length - 1].toISOString(),
      };
    }

    default:
      throw new Error(`Uknown action type provided`);
  }
};

const [ctx, MetadataProvider] = createCtx(reducer, initialState);
export const MetadataContext = ctx;

export default MetadataProvider;
