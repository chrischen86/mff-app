import React from 'react';
import { MetadataContext } from '../../context/metadataContext';
import { Metadata, SelectedCharacterBonus } from '../../types';
import { StageGroupedData } from '../types';

const prepare = (
  data: SelectedCharacterBonus[],
  metadata: Metadata
): StageGroupedData[] => {
  const groupedData = Array.from(
    data.reduce((acc, val) => {
      const character = metadata.characters.find(
        (c) => c.id === val.characterId
      );

      const stage = metadata.stages.find((s) => s.id === val.stageId);

      const currentStageGroupedItem = acc.get(val.stageId);
      if (currentStageGroupedItem === undefined) {
        acc.set(val.stageId, {
          stageId: val.stageId,
          stage,
          characterId1: val.characterId,
          character1: character,
          characterId2: null,
          characterId3: null,
        });
      } else {
        acc.set(val.stageId, {
          ...currentStageGroupedItem,
          characterId2: currentStageGroupedItem.characterId2 || val.characterId,
          character2: currentStageGroupedItem.character2 || character,
          characterId3:
            currentStageGroupedItem.characterId3 ||
            (currentStageGroupedItem.characterId2 && val.characterId),
          character3:
            currentStageGroupedItem.character3 ||
            (currentStageGroupedItem.character2 && character),
        });
      }

      return acc;
    }, new Map<number, StageGroupedData>()),
    ([key, value]) => ({ ...value })
  );

  return groupedData;
};

const useStageGroupedData = (
  data: SelectedCharacterBonus[]
): StageGroupedData[] => {
  const { state: metadata } = React.useContext(MetadataContext);
  const [groupedData, setGroupData] = React.useState<StageGroupedData[]>([]);

  React.useEffect(() => {
    if (data !== undefined) {
      const preparedData = prepare(data, metadata);
      setGroupData(preparedData);
    }
  }, [data, metadata]);

  return groupedData;
};

export default useStageGroupedData;
