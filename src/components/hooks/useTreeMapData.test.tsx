import useTreeMapData from './useTreeMapData';
import { Metadata, SelectedCharacterBonus } from '../../types';

test('renders learn react link', () => {
  const data: SelectedCharacterBonus[] = [
    {
      date: '2021-01-01T15:00:00.000Z',
      stageId: 1,
      characterId: 'antman',
    },
    {
      date: '2021-01-01T15:00:00.000Z',
      stageId: 28,
      characterId: 'amadeuscho',
    },
    {
      date: '2021-01-01T15:00:00.000Z',
      stageId: 29,
      characterId: 'antman',
    },
    {
      date: '2021-01-01T15:00:00.000Z',
      stageId: 29,
      characterId: 'amadeuscho',
    },
    {
      date: '2021-01-01T15:00:00.000Z',
      stageId: 30,
      characterId: 'antman',
    },
  ];
  const metadata: Metadata = {
    stages: [
      {
        id: 1,
        stage: 1,
        subStage: 1,
        name: 'Emergency Dispatch',
        story: 'Dimensional Clash',
      },
      {
        id: 28,
        stage: 12,
        subStage: 2,
        name: 'Majestic Threat',
        story: 'The All War',
      },
      {
        id: 29,
        stage: 13,
        subStage: 1,
        name: 'The Ultimates',
        story: 'The Future Ends Here',
      },
      {
        id: 30,
        stage: 13,
        subStage: 2,
        name: 'Manipulated Justice',
        story: 'The Future Ends Here',
      },
    ],
    characters: [
      {
        id: 'amadeuscho',
        name: 'Amadeus Cho',
        type: 'Combat',
        advancementType: 'Awakening',
      },
      {
        id: 'antman',
        name: 'Ant Man',
        type: 'Speed',
        advancementType: 'T3',
      },
    ],
    currentMonth: 'Feb',
    stories: ['Dimensional Clash', 'The All War', 'The Future Ends Here'],
  };
  const result = JSON.stringify(useTreeMapData(data, metadata));

  expect(result).toBe(
    `{"name":"Character Bonus By Story","children":[{"name":"Dimensional Clash","children":[{"name":"Ant Man","loc":1}]},{"name":"The All War","children":[{"name":"Amadeus Cho","loc":1}]},{"name":"The Future Ends Here","children":[{"name":"Ant Man","loc":2},{"name":"Amadeus Cho","loc":1}]}]}`
  );
});
