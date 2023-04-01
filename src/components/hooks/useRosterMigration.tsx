import { Character } from '../../types';
import { IHash, OwnedRoster, Roster } from '../types';
import useLocalStorage from './useLocalStorage';
import { useCallback } from 'react';

const defaultRoster: Roster = { unowned: {} };
const defaultOwnedRoster: OwnedRoster = { owned: {} };

const useRosterMigration = () => {
  const { value: roster, removeItem } = useLocalStorage<Roster>(
    'roster',
    defaultRoster
  );

  const { setValue: setOwnedRoster } = useLocalStorage<OwnedRoster>(
    'ownedroster',
    defaultOwnedRoster
  );

  const migrateRosterStorage = useCallback(
    (characterMetadata: Character[]) => {
      const { unowned } = roster;
      const unownedIds = Object.keys(unowned);
      if (
        characterMetadata &&
        characterMetadata.length > 0 &&
        unownedIds.length > 0
      ) {
        const owned: IHash = {};
        characterMetadata
          .filter((c) => unownedIds.indexOf(c.id) < 0)
          .forEach((c) => {
            owned[c.id] = true;
          });

        setOwnedRoster((r) => ({ ...r, owned }));

        removeItem();
      }
    },
    [removeItem, roster, setOwnedRoster]
  );

  return { migrateRosterStorage };
};

export default useRosterMigration;
