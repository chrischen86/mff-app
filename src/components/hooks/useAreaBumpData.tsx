import { SelectedCharacterBonus } from '../../types';
import { AreaBumpInputSerie } from '@nivo/bump';
import useRankTableData from './useRankTableData';

const prepare = (data: SelectedCharacterBonus[]): AreaBumpInputSerie[] => {
  const uniqueDates = Array.from(new Set(data.map((d) => d.date)));
  const areaBumpData = Array.from(
    data.reduce((acc, val) => {
      const usageData = acc.get(val.characterId);

      if (usageData === undefined) {
        acc.set(val.characterId, [
          ...uniqueDates.map((d) => ({
            x: d,
            y: d === val.date ? 1 : 0,
          })),
        ]);
      } else {
        const dataPoint = usageData.find((d) => d.x === val.date);
        if (dataPoint === undefined) {
          acc.set(val.characterId, [
            ...usageData.filter((d) => d.x !== val.date),
            { x: val.date, y: 1 },
          ]);
        } else {
          const updatedDataPoint = {
            ...dataPoint,
            y: dataPoint.y + 1,
          };
          acc.set(
            val.characterId,
            usageData.map((d) => (d.x === val.date ? updatedDataPoint : d))
          );
        }
      }

      return acc;
    }, new Map<string, { x: string; y: number }[]>()),
    ([key, value]) => ({ id: key, data: value })
  );

  return areaBumpData;
};

const useAreaBumpData = (
  data: SelectedCharacterBonus[]
): AreaBumpInputSerie[] => {
  const rankData = useRankTableData(data);

  if (data === undefined) {
    return [];
  }

  const top10 = rankData.slice(0, 10);
  const areaBumpData = prepare(data);
  return areaBumpData.filter((d) =>
    top10.find((t) => t.characterName === d.id)
  );
};

export default useAreaBumpData;
