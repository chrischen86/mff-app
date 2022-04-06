import { Roster, StageGroupedData } from '../../components/types';

import leadCalculator from './leadCalculator';

test('team matches nothing', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const team = ['sentry', 'sentry', 'sentry'];
  const result = leadCalculator(data, team[0], team[1], team[2]);
  expect(result.position1).toBe(data.characterId1);
  expect(result.position2).toBe(data.characterId2);
  expect(result.position3).toBe(data.characterId3);
});

test('team position 1 matches position 1', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const team = ['wintersoldier', 'sentry', 'sentry'];
  const result = leadCalculator(data, team[0], team[1], team[2]);
  expect(result.position1).toBe(data.characterId1);
  expect(result.position2).toBe(data.characterId2);
  expect(result.position3).toBe(data.characterId3);
});

test('team position 1 matches position 2', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const team = ['nightcrawler', 'sentry', 'sentry'];
  const result = leadCalculator(data, team[0], team[1], team[2]);
  expect(result.position1).toBe(data.characterId2);
  expect(result.position2).toBe(data.characterId1);
  expect(result.position3).toBe(data.characterId3);
});

test('team position 1 matches position 3', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const team = ['x23', 'sentry', 'sentry'];
  const result = leadCalculator(data, team[0], team[1], team[2]);
  expect(result.position1).toBe(data.characterId3);
  expect(result.position2).toBe(data.characterId2);
  expect(result.position3).toBe(data.characterId1);
});

test('team position 2 matches position 1', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const team = ['sentry', 'wintersoldier', 'sentry'];
  const result = leadCalculator(data, team[0], team[1], team[2]);
  expect(result.position1).toBe(data.characterId2);
  expect(result.position2).toBe(data.characterId1);
  expect(result.position3).toBe(data.characterId3);
});

test('team position 2 matches position 2', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const team = ['sentry', 'nightcrawler', 'sentry'];
  const result = leadCalculator(data, team[0], team[1], team[2]);
  expect(result.position1).toBe(data.characterId1);
  expect(result.position2).toBe(data.characterId2);
  expect(result.position3).toBe(data.characterId3);
});

test('team position 2 matches position 3', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const team = ['sentry', 'x23', 'sentry'];
  const result = leadCalculator(data, team[0], team[1], team[2]);
  expect(result.position1).toBe(data.characterId1);
  expect(result.position2).toBe(data.characterId3);
  expect(result.position3).toBe(data.characterId2);
});

test('team position 3 matches position 1', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const team = ['sentry', 'sentry', 'wintersoldier'];
  const result = leadCalculator(data, team[0], team[1], team[2]);
  expect(result.position1).toBe(data.characterId3);
  expect(result.position2).toBe(data.characterId2);
  expect(result.position3).toBe(data.characterId1);
});

test('team position 3 matches position 2', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const team = ['sentry', 'sentry', 'nightcrawler'];
  const result = leadCalculator(data, team[0], team[1], team[2]);
  expect(result.position1).toBe(data.characterId1);
  expect(result.position2).toBe(data.characterId3);
  expect(result.position3).toBe(data.characterId2);
});

test('team position 3 matches position 3', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const team = ['sentry', 'sentry', 'x23'];
  const result = leadCalculator(data, team[0], team[1], team[2]);
  expect(result.position1).toBe(data.characterId1);
  expect(result.position2).toBe(data.characterId2);
  expect(result.position3).toBe(data.characterId3);
});

test('missing lead', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { wintersoldier: true },
  };
  const team = ['sentry', 'knull', 'adam'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(team[0]);
  expect(result.position2).toBe(data.characterId2);
  expect(result.position3).toBe(data.characterId3);
});

test('missing position 2', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { nightcrawler: true },
  };
  const team = ['sentry', 'knull', 'adam'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(data.characterId1);
  expect(result.position2).toBe(team[1]);
  expect(result.position3).toBe(data.characterId3);
});

test('missing position 3', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { x23: true },
  };
  const team = ['sentry', 'knull', 'adam'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(data.characterId1);
  expect(result.position2).toBe(data.characterId2);
  expect(result.position3).toBe(team[2]);
});

test('missing lead, team matches position 2 and 3', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { wintersoldier: true },
  };
  const team = ['sentry', 'nightcrawler', 'x23'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(team[0]);
  expect(result.position2).toBe(data.characterId2);
  expect(result.position3).toBe(data.characterId3);
});

test('missing lead, team position 3 matches position 2', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { wintersoldier: true },
  };
  const team = ['sentry', 'knull', 'nightcrawler'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(team[0]);
  expect(result.position2).toBe(data.characterId3);
  expect(result.position3).toBe(data.characterId2);
});

test('missing lead, team position 2 matches position 3', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { wintersoldier: true },
  };
  const team = ['sentry', 'x23', 'adam'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(team[0]);
  expect(result.position2).toBe(data.characterId3);
  expect(result.position3).toBe(data.characterId2);
});

test('missing position 2, team matches position 1 and 3', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { nightcrawler: true },
  };
  const team = ['wintersoldier', 'knull', 'x23'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(data.characterId1);
  expect(result.position2).toBe(team[1]);
  expect(result.position3).toBe(data.characterId3);
});

test('missing position 2, team position 1 matches position 3', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { nightcrawler: true },
  };
  const team = ['x23', 'knull', 'adam'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(data.characterId3);
  expect(result.position2).toBe(team[1]);
  expect(result.position3).toBe(data.characterId1);
});

test('missing position 2, team position 3 matches position 1', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { nightcrawler: true },
  };
  const team = ['sentry', 'knull', 'wintersoldier'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(data.characterId3);
  expect(result.position2).toBe(team[1]);
  expect(result.position3).toBe(data.characterId1);
});

test('missing position 2, team position 2 matches position 1', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { nightcrawler: true },
  };
  const team = ['sentry', 'wintersoldier', 'adam'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(team[0]);
  expect(result.position2).toBe(data.characterId1);
  expect(result.position3).toBe(data.characterId3);
});

test('missing position 2, team position 2 matches position 3', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { nightcrawler: true },
  };
  const team = ['sentry', 'x23', 'adam'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(data.characterId1);
  expect(result.position2).toBe(data.characterId3);
  expect(result.position3).toBe(team[2]);
});

test('missing position 3, team matches position 1 and 2', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { x23: true },
  };
  const team = ['wintersoldier', 'nightcrawler', 'adam'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(data.characterId1);
  expect(result.position2).toBe(data.characterId2);
  expect(result.position3).toBe(team[2]);
});

test('missing position 3, team position 1 matches position 2', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { x23: true },
  };
  const team = ['nightcrawler', 'knull', 'adam'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(data.characterId2);
  expect(result.position2).toBe(data.characterId1);
  expect(result.position3).toBe(team[2]);
});

test('missing position 3, team position 2 matches position 1', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { x23: true },
  };
  const team = ['sentry', 'wintersoldier', 'adam'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(data.characterId2);
  expect(result.position2).toBe(data.characterId1);
  expect(result.position3).toBe(team[2]);
});

test('missing position 3, team position 3 matches position 1', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { x23: true },
  };
  const team = ['sentry', 'knull', 'wintersoldier'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(team[0]);
  expect(result.position2).toBe(data.characterId2);
  expect(result.position3).toBe(data.characterId1);
});

test('missing position 3, team position 3 matches position 2', () => {
  const data: StageGroupedData = {
    stageId: 1,
    characterId1: 'wintersoldier',
    characterId2: 'nightcrawler',
    characterId3: 'x23',
  };
  const roster: Roster = {
    unowned: { x23: true },
  };
  const team = ['sentry', 'knull', 'nightcrawler'];
  const result = leadCalculator(data, team[0], team[1], team[2], roster);
  expect(result.position1).toBe(data.characterId1);
  expect(result.position2).toBe(team[1]);
  expect(result.position3).toBe(data.characterId2);
});
