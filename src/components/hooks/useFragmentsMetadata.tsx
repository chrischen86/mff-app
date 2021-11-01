import { useQuery } from 'react-query';

const useFragmentMetadata = () => {
  return useQuery('fragments', async () => {
    const res = await fetch(
      'https://chrischen86.github.io/mff-data/fragments.json'
    );
    return res.json();
  });
};

export default useFragmentMetadata;
