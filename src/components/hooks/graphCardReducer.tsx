import { Filter } from '../../filters/types';
import { SelectedCharacterBonus } from '../../types';
import timeFilters from '../../filters/timeFilters';
import storyFilters from '../../filters/storyFilters';

import { AreaBumpInputSerie } from '@nivo/bump';

interface Action {
  type: string;
  rawData: SelectedCharacterBonus[];
  filters?: Filter[];
}

interface State {
  data: AreaBumpInputSerie[];
}

const initialState = {
  data: [],
};

const filterGroups = [timeFilters, storyFilters];

const graphCardReducer = (
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
      const rankBonusesData = Array.from(
        filteredData.reduce((acc, val) => {
          const usageData = acc.get(val.characterId);

          if (usageData === undefined) {
            acc.set(val.characterId, [
              {
                x: val.date,
                y: 1,
              },
            ]);
          } else {
            const dataPoint = usageData.filter((d) => d.x === val.date);
            if (dataPoint.length === 0) {
              acc.set(val.characterId, [
                ...usageData.filter((d) => d.x !== val.date),
                { x: val.date, y: 1 },
              ]);
            } else if (dataPoint.length === 1) {
              acc.set(val.characterId, [
                ...usageData.filter((d) => d.x !== val.date),
                { x: val.date, y: dataPoint[0].y + 1 },
              ]);
            }
          }

          return acc;
        }, new Map<string, { x: string; y: number }[]>()),
        ([key, value]) => ({ id: key, data: value })
      );
      console.log(rankBonusesData);
      return { data: rankBonusesData };
    default:
      return state;
  }
};

export default graphCardReducer;
