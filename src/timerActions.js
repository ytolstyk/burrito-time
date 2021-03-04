export const BURRITO_COUNT = 'BURRITO_COUNT';
export const BURRITO_TIMESTAMP = 'BURRITO_TIMESTAMP';
export const BURRITO_COUNT_TIMESTAMP = 'BURRITO_COUNT_TIMESTAMP';

export function updateCount(num) {
  return {
    type: BURRITO_COUNT,
    payload: num,
  };
}

export function updateLastTimestamp(date) {
  return {
    type: BURRITO_TIMESTAMP,
    payload: date,
  };
}

export function updateCountAndTimestamp(data) {
  return {
    type: BURRITO_COUNT_TIMESTAMP,
    payload: data,
  };
}
