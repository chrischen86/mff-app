import { SelectedCharacterBonus } from '../../types';
import { RawData } from '../types';

const prepare = (data: SelectedCharacterBonus[]): RawData[] => {
  const rankData = Array.from(
    data.reduce((acc, val) => {
      const currentCount = acc.get(val.characterId);
      acc.set(val.characterId, currentCount ? currentCount + 1 : 1);
      return acc;
    }, new Map<string, number>()),
    ([key, value]) => ({ id: key, value })
  ).sort((a, b) => b.value - a.value);

  return rankData;
};

const usePieChartData = (data: SelectedCharacterBonus[]): RawData[] => {
  if (data === undefined) {
    return [];
  }

  const rankData = prepare(data);
  return rankData;
};

export default usePieChartData;
