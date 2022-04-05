import React from 'react';

const getStorageValue = (key: string, defaultValue: any) => {
  const saved: any = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
};

const useLocalStorage = <T,>(key: string, defaultValue: any) => {
  const [value, setValue] = React.useState<T>(() => {
    return getStorageValue(key, defaultValue);
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return { value, setValue };
};
export default useLocalStorage;
