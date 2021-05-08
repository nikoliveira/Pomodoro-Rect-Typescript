import { zeroLeft } from './zero-left';

export function secondTime(seconds: number): string {
  //Dentro do math.floor(n) fica dinâmico se não precisaria criar duas funções
  const minutes = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);

  return `${minutes}:${sec}`;
}
