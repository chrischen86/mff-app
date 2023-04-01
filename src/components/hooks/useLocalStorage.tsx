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

  const removeItem = React.useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  }, [key]);

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return { value, setValue, removeItem };
};
export default useLocalStorage;
