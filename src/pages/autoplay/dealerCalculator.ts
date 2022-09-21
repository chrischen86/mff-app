import { Roster, StageGroupedData } from '../../components/types';

const dealerCalculator = (
  stageData: StageGroupedData,
  teamCharacterId1: string | null = null,
  teamCharacterId2: string | null = null,
  teamCharacterId3: string | null = null,
  roster?: Roster,
  dealerSlot: number = 1
) => {
  const { characterId1, characterId2, characterId3 } = stageData;

  const teamArray = [teamCharacterId1, teamCharacterId2, teamCharacterId3];
  const designatedArray = [characterId1, characterId2, characterId3];
  const slotArray = [characterId1, characterId2, characterId3];

  //If the designated hero is already in a slot, the slot will not be changed.
  for (let teamIndex: number = 0; teamIndex < teamArray.length; teamIndex++) {
    const currentCharacter = teamArray[teamIndex];
    const designatedIndex = designatedArray.indexOf(currentCharacter);
    if (designatedIndex >= 0) {
      slotArray[designatedIndex] = slotArray[teamIndex];
      slotArray[teamIndex] = currentCharacter;
    }
  }

  //Characters are substituted if not owned
  if (roster !== undefined) {
    const { unowned } = roster;
    for (let slotIndex: number = 0; slotIndex < slotArray.length; slotIndex++) {
      const currentCharacter = slotArray[slotIndex];
      if (currentCharacter && unowned.hasOwnProperty(currentCharacter)) {
        slotArray[slotIndex] = teamArray[slotIndex];
      }
    }
  }

  if (dealerSlot === 2) {
    return {
      position1: slotArray[1],
      position2: slotArray[0],
      position3: slotArray[2],
    };
  } else if (dealerSlot === 3) {
    return {
      position1: slotArray[2],
      position2: slotArray[1],
      position3: slotArray[0],
    };
  }
  return {
    position1: slotArray[0],
    position2: slotArray[1],
    position3: slotArray[2],
  };
};

export default dealerCalculator;
