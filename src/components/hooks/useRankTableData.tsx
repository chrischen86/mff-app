import { Metadata, SelectedCharacterBonus } from '../../types';
import { BonusesCount } from '../types';

const prepare = (
  data: SelectedCharacterBonus[],
  metadata?: Metadata
): BonusesCount[] => {
  const rankData = Array.from(
    data.reduce((acc, val) => {
      const currentCount = acc.get(val.characterId);
      acc.set(val.characterId, currentCount ? currentCount + 1 : 1);
      return acc;
    }, new Map<string, number>()),
    ([key, value]) => {
      const characterName =
        metadata?.characters.find((c) => c.id === key)?.name || key;
      return {
        characterName,
        count: value,
      };
    }
  ).sort((a, b) => b.count - a.count);

  return rankData;
};

const useRankTableData = (
  data: SelectedCharacterBonus[],
  metadata?: Metadata
): BonusesCount[] => {
  if (data === undefined) {
    return [];
  }

  const rankData = prepare(data, metadata);
  return rankData;
};

export default useRankTableData;
