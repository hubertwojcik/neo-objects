import { useEffect, useState } from 'react';

const ONE_SECOND_IN_MS = 1000;

export const useTicking = () => {
  const [tickings, setTickings] = useState(new Date().getSeconds());

  useEffect(() => {
    const increaseSeconds = setInterval(() => {
      setTickings((val) => val + 1 / 10);
    }, ONE_SECOND_IN_MS / 10);

    return () => {
      clearInterval(increaseSeconds);
    };
  }, [setTickings]);

  return {
    tickings,
  };
};
