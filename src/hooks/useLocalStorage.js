import { useEffect, useState } from 'react';

const readStoredValue = (key, initialValue) => {
  if (typeof window === 'undefined') return initialValue;

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue === null ? initialValue : JSON.parse(storedValue);
  } catch (error) {
    console.warn(`Could not read "${key}" from local storage.`, error);
    return initialValue;
  }
};

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => readStoredValue(key, initialValue));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Could not save "${key}" to local storage.`, error);
    }
  }, [key, value]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== key && event.key !== null) return;
      if (event.key === null) {
        setValue(initialValue);
        return;
      }

      try {
        setValue(event.newValue === null ? initialValue : JSON.parse(event.newValue));
      } catch (error) {
        console.warn(`Could not sync "${key}" from another tab.`, error);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [initialValue, key]);

  return [value, setValue];
};