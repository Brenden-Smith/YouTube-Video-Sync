export function formatTime(value: number) {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value - minutes * 60).toLocaleString(undefined, {
    minimumIntegerDigits: 2,
    maximumSignificantDigits: 2,
  });
  return `${minutes}:${seconds}`;
}