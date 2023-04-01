import { OwnedRoster, StageGroupedData } from '../../components/types';

const dealerCalculator = (
  stageData: StageGroupedData,
  team: (string | null)[],
  roster?: OwnedRoster,
  dealerSlot: number = 0
) => {
  const { characterId1, characterId2, characterId3 } = stageData;
  const designatedArray = [characterId1, characterId2, characterId3];
  const trackUsed = [characterId1, characterId2, characterId3];

  //Any unowned characters means dealer slot character is active
  if (roster !== undefined) {
    const { owned } = roster;
    for (let d: number = 0; d < designatedArray.length; d++) {
      const currentCharacter = designatedArray[d];
      if (currentCharacter && !owned.hasOwnProperty(currentCharacter)) {
        return {
          position1: team[dealerSlot] ?? null,
          position2: null,
          position3: null,
        };
      }
    }
  }

  // if dealer slot character is a designated character, then they are active
  if (designatedArray.indexOf(team[dealerSlot]) >= 0) {
    return {
      position1: team[dealerSlot],
      position2: null,
      position3: null,
    };
  }

  // otherwise
  // active character is the first designated character not on team
  for (let t: number = 0; t < team.length; t++) {
    if (t === dealerSlot) {
      continue;
    }
    const teamCharacter = team[t];
    const designatedIndex = designatedArray.indexOf(teamCharacter);
    if (designatedIndex >= 0) {
      trackUsed[designatedIndex] = null;
    }
  }

  // First non null
  const activeCharacter = trackUsed.find((c) => c !== null) || null;
  return { position1: activeCharacter, position2: null, position3: null };
};

export default dealerCalculator;
