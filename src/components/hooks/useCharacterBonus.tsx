import { useQuery } from 'react-query';

const useCharacterBonus = () => {
  return useQuery(
    'characterBonus',
    async () => {
      const res = await fetch(
        'https://chrischen86.github.io/mff-data/selectedcharacterbonus.json'
      );
      return res.json();
    },
    { notifyOnChangeProps: ['data', 'error'] }
  );
};

export default useCharacterBonus;
