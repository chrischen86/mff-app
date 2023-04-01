import { OwnedRoster, StageGroupedData } from '../../components/types';

import leadCalculator from './dealerCalculator';

describe('all owned, team matches nothing', () => {
  test.each([
    { dealerSlot: 0, expected: 'd1' },
    { dealerSlot: 1, expected: 'd1' },
    { dealerSlot: 2, expected: 'd1' },
  ])('%j', ({ dealerSlot, expected }) => {
    const data: StageGroupedData = {
      stageId: 1,
      characterId1: 'd1',
      characterId2: 'd2',
      characterId3: 'd3',
    };
    const roster: OwnedRoster = { owned: { d1: true, d2: true, d3: true } };
    const team = ['t1', 't2', 't3'];
    const result = leadCalculator(data, team, roster, dealerSlot);
    expect(result.position1).toEqual(expected);
  });
});

describe('all owned, team matches 1 designated', () => {
  const stageData: StageGroupedData = {
    stageId: 1,
    characterId1: 'd1',
    characterId2: 'd2',
    characterId3: 'd3',
  };
  const roster: OwnedRoster = { owned: { d1: true, d2: true, d3: true } };

  test.each([
    { team: ['d1', 't2', 't3'], dealerSlot: 0, expected: 'd1' },
    { team: ['t1', 'd1', 't3'], dealerSlot: 0, expected: 'd2' },
    { team: ['t1', 't2', 'd1'], dealerSlot: 0, expected: 'd2' },
    { team: ['d2', 't2', 't3'], dealerSlot: 0, expected: 'd2' },
    { team: ['t1', 'd2', 't3'], dealerSlot: 0, expected: 'd1' },
    { team: ['t1', 't2', 'd2'], dealerSlot: 0, expected: 'd1' },
    { team: ['d3', 't2', 't3'], dealerSlot: 0, expected: 'd3' },
    { team: ['t1', 'd3', 't3'], dealerSlot: 0, expected: 'd1' },
    { team: ['t1', 't2', 'd3'], dealerSlot: 0, expected: 'd1' },
    //------
    { team: ['d1', 't2', 't3'], dealerSlot: 1, expected: 'd2' },
    { team: ['t1', 'd1', 't3'], dealerSlot: 1, expected: 'd1' },
    { team: ['t1', 't2', 'd1'], dealerSlot: 1, expected: 'd2' },
    { team: ['d2', 't2', 't3'], dealerSlot: 1, expected: 'd1' },
    { team: ['t1', 'd2', 't3'], dealerSlot: 1, expected: 'd2' },
    { team: ['t1', 't2', 'd2'], dealerSlot: 1, expected: 'd1' },
    { team: ['d3', 't2', 't3'], dealerSlot: 1, expected: 'd1' },
    { team: ['t1', 'd3', 't3'], dealerSlot: 1, expected: 'd3' },
    { team: ['t1', 't2', 'd3'], dealerSlot: 1, expected: 'd1' },
    //------
    { team: ['d1', 't2', 't3'], dealerSlot: 2, expected: 'd2' },
    { team: ['t1', 'd1', 't3'], dealerSlot: 2, expected: 'd2' },
    { team: ['t1', 't2', 'd1'], dealerSlot: 2, expected: 'd1' },
    { team: ['d2', 't2', 't3'], dealerSlot: 2, expected: 'd1' },
    { team: ['t1', 'd2', 't3'], dealerSlot: 2, expected: 'd1' },
    { team: ['t1', 't2', 'd2'], dealerSlot: 2, expected: 'd2' },
    { team: ['d3', 't2', 't3'], dealerSlot: 2, expected: 'd1' },
    { team: ['t1', 'd3', 't3'], dealerSlot: 2, expected: 'd1' },
    { team: ['t1', 't2', 'd3'], dealerSlot: 2, expected: 'd3' },
  ])('%j', ({ team, dealerSlot, expected }) => {
    const result = leadCalculator(stageData, team, roster, dealerSlot);
    expect(result.position1).toEqual(expected);
  });
});

describe('1 missing, team matches nothing', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'd1',
    characterId2: 'd2',
    characterId3: 'd3',
  };
  const roster: OwnedRoster = { owned: { d2: true, d3: true } };
  const team = ['t1', 't2', 't3'];

  test.each([
    { dealerSlot: 0, expected: 't1' },
    { dealerSlot: 1, expected: 't2' },
    { dealerSlot: 2, expected: 't3' },
  ])('%j', ({ dealerSlot, expected }) => {
    const result = leadCalculator(data, team, roster, dealerSlot);
    expect(result.position1).toEqual(expected);
  });
});
