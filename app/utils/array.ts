export function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  if (chunkSize <= 0) throw new Error('Chunk size must be greater than 0');

  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }

  return result;
}
