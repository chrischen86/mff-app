import timeFilters from './timeFilters';
import storyFilters from './storyFilters';
import { createFragmentFilters } from './fragmentFilters';

export { createFragmentFilters };

const allFilters = [...timeFilters, ...storyFilters];
export default allFilters;
