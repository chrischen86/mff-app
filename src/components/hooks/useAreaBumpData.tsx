import { SelectedCharacterBonus } from '../../types';
import { AreaBumpInputSerie } from '@nivo/bump';

const prepare = (data: SelectedCharacterBonus[]): AreaBumpInputSerie[] => {
  const areaBumpData = Array.from(
    data.reduce((acc, val) => {
      const usageData = acc.get(val.characterId);

      if (usageData === undefined) {
        acc.set(val.characterId, [
          {
            x: val.date,
            y: 1,
          },
        ]);
      } else {
        const dataPoint = usageData.filter((d) => d.x === val.date);
        if (dataPoint.length === 0) {
          acc.set(val.characterId, [
            ...usageData.filter((d) => d.x !== val.date),
            { x: val.date, y: 1 },
          ]);
        } else if (dataPoint.length === 1) {
          acc.set(val.characterId, [
            ...usageData.filter((d) => d.x !== val.date),
            { x: val.date, y: dataPoint[0].y + 1 },
          ]);
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
  if (data === undefined) {
    return [];
  }

  const areaBumpData = prepare(data);
  return areaBumpData;
};

export default useAreaBumpData;
