import { StageGroupedData } from '../../components/types';

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
