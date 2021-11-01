import React from 'react';
import { Metadata, SelectedCharacterBonus, Stage } from '../../types';
import { BarItem } from '../types';

const getKeys = (data: Stage[]) => {
  const keys = data.flatMap((d) => d.story);
  return Array.from(new Set(keys));
};

interface BarCountItem {
  [key: string]: number;
}

const prepare = (
  data: SelectedCharacterBonus[],
  metadata: Metadata
): BarItem[] => {
  const keys = getKeys(metadata.stages);
  const rankData = Array.from(
    data.reduce((acc, val) => {
      const story =
        metadata.stages.find((s) => s.id === val.stageId)?.story ||
        `Stage ${val.stageId}`;

      const characterName =
        metadata.characters.find((c) => c.id === val.characterId)?.name ||
        val.characterId;

      const currentCharacterItem = acc.get(characterName);
      if (currentCharacterItem === undefined) {
        const barCountItem = keys.reduce((acc, current) => {
          return {
            ...acc,
            [current]: current === story ? 1 : 0,
          };
        }, {});
        //acc.set(characterName, { [story]: 1 });
        acc.set(characterName, barCountItem);
      } else {
        const storyCharacterCount = currentCharacterItem[story] || 0;

        acc.set(characterName, {
          ...currentCharacterItem,
          [story]: storyCharacterCount + 1,
        });
      }

      return acc;
    }, new Map<string, BarCountItem>()),
    ([key, value]) => ({ characterName: key, ...value })
  );

  return rankData;
};

const useBarChartData = (
  data: SelectedCharacterBonus[],
  metadata: Metadata
): BarItem[] => {
  const [barData, setBarData] = React.useState<BarItem[]>([]);

  React.useEffect(() => {
    if (data !== undefined) {
      const preparedData = prepare(data, metadata);
      setBarData(preparedData);
    }
  }, [data, metadata]);

  return barData;
};

export default useBarChartData;
