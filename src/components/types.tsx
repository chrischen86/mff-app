import { Character, Stage } from '../types';

export interface BonusesCount {
  characterName: string;
  count: number;
}
export interface RankTableCardProps {
  bonuses: BonusesCount[];
}

export interface RawData {
  id: string;
  value: number;
}

export interface TreemapItem {
  name: string;
  color?: string;
  loc?: number;
  children?: TreemapItem[];
}

export interface BarItem {
  characterName: string;
  [key: string]: string | number;
}

export interface StageGroupedData {
  stageId: number;
  characterId1: string | null;
  characterId2: string | null;
  characterId3: string | null;

  stage?: Stage;
  character1?: Character;
  character2?: Character;
  character3?: Character;
}

interface IHash {
  [indexer: string]: boolean;
}

export interface Roster {
  unowned: IHash;
}
