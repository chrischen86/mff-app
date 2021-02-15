import { useQuery } from 'react-query';

const useStagesMetadata = () => {
  return useQuery('stages', async () => {
    const res = await fetch(
      'https://chrischen86.github.io/mff-data/stages.json'
    );
    return res.json();
  });
};

export default useStagesMetadata;
