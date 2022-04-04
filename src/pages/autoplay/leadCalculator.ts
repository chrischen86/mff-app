import { StageGroupedData } from '../../components/types';

const leadCalculator = (
  stageData: StageGroupedData,
  teamCharacterId1: string | null = null,
  teamCharacterId2: string | null = null,
  teamCharacterId3: string | null = null
) => {
  let {
    characterId1: position1,
    characterId2: position2,
    characterId3: position3,
  } = stageData;

  if (!teamCharacterId1 && !teamCharacterId2 && !teamCharacterId3) {
    return { position1, position2, position3 };
  }

  if (teamCharacterId3 === position1) {
    position1 = position3;
    position3 = teamCharacterId3;
  } else if (teamCharacterId3 === position2) {
    position2 = position3;
    position3 = teamCharacterId3;
  }

  if (teamCharacterId2 === position1) {
    position1 = position2;
    position2 = teamCharacterId2;
  } else if (teamCharacterId2 === position3) {
    position3 = position2;
    position2 = teamCharacterId2;
  }

  if (teamCharacterId1 === position2) {
    position2 = position1;
    position1 = teamCharacterId1;
  } else if (teamCharacterId1 === position3) {
    position3 = position1;
    position1 = teamCharacterId1;
  }
  return { position1, position2, position3 };
};

export default leadCalculator;