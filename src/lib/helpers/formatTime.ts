export const formatTime = (secs: number) => {
  const min = Math.floor(secs / 60);
  const remainingSecs = Math.floor(secs % 60);
  const paddedSecs = remainingSecs < 10 ? `0${remainingSecs}` : remainingSecs;
  return `${min}:${paddedSecs}`;
}