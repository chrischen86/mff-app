import React from 'react';
import storyFilters from '../../filters/storyFilters';
import timeFilters from '../../filters/timeFilters';
import { Filter } from '../../filters/types';
import { SelectedCharacterBonus } from '../../types';
import { BonusesCount } from '../types';

interface Action {
  type: string;
  rawData: SelectedCharacterBonus[];
  filters?: Filter[];
}

interface State {
  data: BonusesCount[];
}

const initialState = {
  data: [],
};

const filterGroups = [timeFilters, storyFilters];

const rankTableDataReducer = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case 'filter':
      const enabledFilters = action.filters?.filter((f) => f.enabled);
      const filteredData = action.rawData.filter((d) =>
        filterGroups.every((fg) =>
          fg
            .filter((f) => enabledFilters?.find((ef) => ef.id === f.id))
            .some((f) => f.predicate(d))
        )
      );
      ////  action.filters?.filter((f) => f.enabled).every((f) => f.predicate(d))
      console.log(filteredData);
      const rankData = Array.from(
        filteredData.reduce((acc, val) => {
          const currentCount = acc.get(val.characterId);
          acc.set(val.characterId, currentCount ? currentCount + 1 : 1);
          return acc;
        }, new Map<string, number>()),
        ([key, value]) => ({ characterName: key, count: value })
      ).sort((a, b) => b.count - a.count);

      return { data: rankData };
    default:
      return state;
  }
};

const useRankTableData = (
  reducer: (state: State, action: Action) => State = rankTableDataReducer
): {
  data: BonusesCount[];
  applyFilter: (data: SelectedCharacterBonus[], filters: Filter[]) => void;
} => {
  const [{ data }, dispatch] = React.useReducer(reducer, {
    data: [],
  });

  const applyFilter = React.useCallback(
    (data: SelectedCharacterBonus[], filters: Filter[]) =>
      dispatch({ type: 'filter', rawData: data, filters: filters }),
    []
  );

  return { data, applyFilter };
};

export { useRankTableData, rankTableDataReducer };
