export interface SelectedCharacterBonus {
  date: string;
  characterId: string;
  stageId: number;
}

export interface Stage {
  id: number;
  stage: number;
  subStage: number;
  name: string;
  story: string;
}

export interface Character {
  id: string;
  name: string;
  type: 'Combat' | 'Speed' | 'Blast' | 'Universal';
  advancementType: 'T2' | 'T3' | 'Awakening';
}

export interface Metadata {
  stages: Stage[];
  characters: Character[];
  stories: string[];
  currentMonth?: string;
}
