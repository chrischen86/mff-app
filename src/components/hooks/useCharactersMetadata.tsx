import { useQuery } from 'react-query';

const useCharactersMetadata = () => {
  return useQuery('characters', async () => {
    const res = await fetch(
      'https://chrischen86.github.io/mff-data/characters.json'
    );
    return res.json();
  });
};

export default useCharactersMetadata;
