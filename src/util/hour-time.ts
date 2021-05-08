import { zeroLeft } from './zero-left';

export function hourTime(seconds: number): string {
  const hour = zeroLeft(seconds / 3600);
  const minutes = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);

  return `${hour}h:${minutes}m:${sec}s`;
}
