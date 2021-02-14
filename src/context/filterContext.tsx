import createCtx from './createCtx';
import { Filter } from '../filters/types';

const initialState: { filters: Filter[] } = {
  filters: [],
};
type FilterState = typeof initialState;
type Action =
  | { type: 'add'; filters: Filter[] }
  | { type: 'remove'; filters: Filter[] }
  | { type: 'enable'; filterId: string }
  | { type: 'disable'; filterId: string };

const reducer = (state: FilterState, action: Action): FilterState => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        filters: action.filters,
      };
    case 'enable':
    case 'disable': {
      const filter = state.filters.find((f) => f.id === action.filterId);
      if (filter === undefined) {
        return state;
      }

      return {
        ...state,
        filters: state.filters.map((f) => {
          return f.id === action.filterId
            ? {
                ...f,
                enabled: action.type === 'disable' ? false : true,
              }
            : f;
        }),
      };
    }
    case 'remove':
      return {
        ...state,
        filters: [
          ...state.filters.filter((f) =>
            action.filters.find((s) => s.id === f.id)
          ),
        ],
      };
    default:
      throw new Error(`Uknown action type provided`);
  }
};

const [ctx, FilterProvider] = createCtx(reducer, initialState);
export const FilterContext = ctx;

export default FilterProvider;
