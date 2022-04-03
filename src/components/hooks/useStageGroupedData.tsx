import React from 'react';
import { MetadataContext } from '../../context/metadataContext';
import { Metadata, SelectedCharacterBonus, Stage } from '../../types';
import { StageGroupedData } from '../types';

const prepare = (
  data: SelectedCharacterBonus[],
  metadata: Metadata
): StageGroupedData[] => {
  const groupedData = Array.from(
    data.reduce((acc, val) => {
      //   const character = metadata.characters.find(
      //     (c) => c.id === val.characterId
      //   );

      const currentStageGroupedItem = acc.get(val.stageId);
      if (currentStageGroupedItem === undefined) {
        acc.set(val.stageId, {
          stageId: val.stageId,
          characterId1: val.characterId,
          characterId2: null,
          characterId3: null,
        });
      } else {
        acc.set(val.stageId, {
          ...currentStageGroupedItem,
          characterId2: currentStageGroupedItem.characterId2 || val.characterId,
          characterId3:
            currentStageGroupedItem.characterId3 ||
            (currentStageGroupedItem.characterId2 && val.characterId),
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
