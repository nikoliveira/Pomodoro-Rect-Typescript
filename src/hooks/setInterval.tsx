import { useEffect, useRef } from 'react';

export function useInterval<G extends CallableFunction>(
  callback: G,
  delay: number | null,
): void {
  const savedCallback = useRef<G>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
