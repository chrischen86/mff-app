import { OwnedRoster } from '../types';
import useLocalStorage from './useLocalStorage';

const defaultRoster: OwnedRoster = { owned: {} };

const useRoster = () => {
  const { value: roster, setValue: setRoster } = useLocalStorage<OwnedRoster>(
    'ownedroster',
    defaultRoster
  );

  const setOwned = (characterId: string, isOwned: boolean = true) => {
    const { owned } = roster;
    if (isOwned) {
      if (!owned.hasOwnProperty(characterId)) {
        owned[characterId] = true;
      }
    } else {
      delete owned[characterId];
    }
    setRoster({ ...roster, owned });
  };

  const isOwned = (characterId: string | null): boolean => {
    const { owned } = roster;
    return owned.hasOwnProperty(characterId ?? '');
  };

  return { roster, setOwned, isOwned };
};

export default useRoster;
