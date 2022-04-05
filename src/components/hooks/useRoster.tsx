import { Roster } from '../types';
import useLocalStorage from './useLocalStorage';

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

  const isOwned = (characterId: string | null): boolean => {
    const { unowned } = roster;
    return !unowned.hasOwnProperty(characterId ?? '');
  };

  return { roster, setOwned, isOwned };
};

export default useRoster;
