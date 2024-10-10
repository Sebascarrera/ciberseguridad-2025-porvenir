import React from "react";

// Utility helper for random number generation
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const useRandomInterval = (callback, minDelay, maxDelay) => {
  const timeoutId = React.useRef(null);
  const savedCallback = React.useRef(callback);
  const isEnabledRef = React.useRef(false);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const start = React.useCallback(() => {
    if (!isEnabledRef.current) {
      isEnabledRef.current = true;
      const handleTick = () => {
        if (isEnabledRef.current) {
          const nextTickAt = random(minDelay, maxDelay);
          timeoutId.current = window.setTimeout(() => {
            savedCallback.current();
            handleTick();
          }, nextTickAt);
        }
      };
      handleTick();
    }
  }, [minDelay, maxDelay]);

  const cancel = React.useCallback(() => {
    isEnabledRef.current = false;
    window.clearTimeout(timeoutId.current);
  }, []);

  return { start, cancel };
};
