import { SelectedCharacterBonus } from '../../types';
import {
  AreaBumpSerie,
  AreaBumpSerieExtraProps,
  DefaultAreaBumpDatum,
} from '@nivo/bump';
import useRankTableData from './useRankTableData';
import React from 'react';

const prepare = (
  data: SelectedCharacterBonus[]
): AreaBumpSerie<DefaultAreaBumpDatum, AreaBumpSerieExtraProps>[] => {
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
): AreaBumpSerie<DefaultAreaBumpDatum, AreaBumpSerieExtraProps>[] => {
  const [areaBumpData, setAreaBumpData] = React.useState<
    AreaBumpSerie<DefaultAreaBumpDatum, AreaBumpSerieExtraProps>[]
  >([]);
  const rankData = useRankTableData(data);

  React.useEffect(() => {
    const top10 = rankData.slice(0, 10);
    const areaData = prepare(data);
    setAreaBumpData(
      areaData.filter((d) => top10.find((t) => t.characterName === d.id))
    );
  }, [data, rankData]);
  return areaBumpData;
};

export default useAreaBumpData;
