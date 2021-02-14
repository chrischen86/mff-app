import { SelectedCharacterBonus } from '../../types';
import { BonusesCount } from '../types';

const prepare = (data: SelectedCharacterBonus[]): BonusesCount[] => {
  const rankData = Array.from(
    data.reduce((acc, val) => {
      const currentCount = acc.get(val.characterId);
      acc.set(val.characterId, currentCount ? currentCount + 1 : 1);
      return acc;
    }, new Map<string, number>()),
    ([key, value]) => ({ characterName: key, count: value })
  ).sort((a, b) => b.count - a.count);

  return rankData;
};

const useRankTableData = (data: SelectedCharacterBonus[]): BonusesCount[] => {
  if (data === undefined) {
    return [];
  }

  const rankData = prepare(data);
  return rankData;
};

export default useRankTableData;
