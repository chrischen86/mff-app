import { SelectedCharacterBonus } from '../types';

export interface Filter {
  predicate: (term: SelectedCharacterBonus) => boolean;
}
