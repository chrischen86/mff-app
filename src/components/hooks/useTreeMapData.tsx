import { Metadata, SelectedCharacterBonus } from '../../types';
import { TreemapItem } from '../types';

const prepare = (
  data: SelectedCharacterBonus[],
  metadata: Metadata
): TreemapItem => {
  const rankData = Array.from(
    data.reduce((acc, val) => {
      const story =
        metadata.stages.find((s) => s.id === val.stageId)?.story ||
        `Stage ${val.stageId}`;
      const currentStory = acc.get(story);
      const characterName =
        metadata.characters.find((c) => c.id === val.characterId)?.name ||
        val.characterId;
      if (currentStory === undefined) {
        acc.set(story, [{ name: characterName, loc: 1 }]);
      } else {
        const storyCharacterItem = currentStory.find(
          (c) => c.name === characterName
        ) ?? {
          name: characterName,
          loc: 0,
        };

        acc.set(story, [
          { ...storyCharacterItem, loc: (storyCharacterItem.loc ?? 0) + 1 },
          ...currentStory.filter((c) => c.name !== characterName),
        ]);
      }

      return acc;
    }, new Map<string, TreemapItem[]>()),
    ([key, value]) => ({ name: key, children: value })
  );
  const theData: TreemapItem = {
    name: 'Character Bonus By Story',
    children: [...rankData],
  };

  return theData;
};

const useTreeMapData = (
  data: SelectedCharacterBonus[],
  metadata: Metadata
): TreemapItem => {
  if (data === undefined) {
    return { name: 'No Data' };
  }

  const rankData = prepare(data, metadata);
  return rankData;
};

export default useTreeMapData;
