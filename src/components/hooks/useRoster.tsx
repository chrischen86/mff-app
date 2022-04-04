import useLocalStorage from './useLocalStorage';

interface IHash {
  [indexer: string]: boolean;
}

interface Roster {
  unowned: IHash;
}

const defaultRoster: Roster = { unowned: {} };

const useRoster = () => {
  const { value: roster, setValue: setRoster } = useLocalStorage<Roster>(
    'roster',
    defaultRoster
  );

  const setOwned = (characterId: string, isOwned: boolean = true) => {
    const { unowned } = roster;
    if (isOwned) {
      delete unowned[characterId];
    } else {
      if (!unowned.hasOwnProperty(characterId)) {
        unowned[characterId] = true;
      }
    }
    setRoster({ ...roster, unowned });
  };

  return { roster, setOwned };
};

export default useRoster;
