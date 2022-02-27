/**
 * @author Vighnesh Raut <rvighnes@amazon.com>
 */

export const debounce = <T extends any[], U>(fn: (...args: T) => U, ms = 1000) => {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: T): void => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      fn(...args);
    }, ms);
  };
};
