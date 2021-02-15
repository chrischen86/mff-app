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

export interface TreemapData {
  root: TreemapItem;
}
