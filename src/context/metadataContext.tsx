import { Character, Stage, SelectedCharacterBonus, Metadata } from '../types';
import createCtx from './createCtx';

const initialState: Metadata = {
  stages: [],
  characters: [],
  stories: [],
  currentMonth: undefined,
};

type MetadataState = typeof initialState;
type Action =
  | { type: 'setStages'; stages: Stage[] }
  | { type: 'setCharacters'; characters: Character[] }
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
    case 'calculateLastMonth': {
      if (action.data === undefined) {
        return state;
      }
      const distinctDates = action.data
        .filter((d, i, arr) => arr.findIndex((t) => t.date === d.date) === i)
        .map((d) => new Date(d.date))
        .sort();

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
