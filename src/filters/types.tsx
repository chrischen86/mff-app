import { SelectedCharacterBonus } from '../types';

export interface Filter {
  id: string;
  label: string;
  enabled: boolean;
  canDelete?: boolean;
  predicate: (term: SelectedCharacterBonus, data?: any) => boolean;
  colour?: string;
  hidden?: boolean;
}
