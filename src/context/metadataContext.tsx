import { Character, Stage, SelectedCharacterBonus, Metadata } from '../types';
import createCtx from './createCtx';

const initialState: Metadata = {
  stages: [],
  characters: [],
  stories: [],
  currentMonth: '',
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
      const distinctDates = action.data
        .filter((d, i, arr) => arr.findIndex((t) => t.date === d.date) === i)
        .map((d) => new Date(d.date))
        .sort();

      console.log(distinctDates);

      return state;
    }

    default:
      throw new Error(`Uknown action type provided`);
  }
};

const [ctx, MetadataProvider] = createCtx(reducer, initialState);
export const MetadataContext = ctx;

export default MetadataProvider;
