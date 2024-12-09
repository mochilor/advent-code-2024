export default function puzzle(input: string): number {
  const arrangedDiskMap = [];
  input.split('').forEach((block: string, index: number) => {
    if (index % 2 === 0) {
      arrangedDiskMap.push(new Array(parseInt(block, 10)).fill((index / 2).toString()));
      return;
    }

    arrangedDiskMap.push(new Array(parseInt(block, 10)).fill('.'));
  });

  for (let n = arrangedDiskMap.length - 1; n >= 0; n -= 1) {
    if (arrangedDiskMap[n][0] === '.') {
      continue;
    }

    let nextFreeBlockIndex = null;
    let blockToMove = [];
    let freeBlockReplacement = [];
    let oldBlockReplacement = [];
    for (let nn = 0; nn <= n; nn += 1) {
      if (arrangedDiskMap[nn][0] === '.' && arrangedDiskMap[nn].length >= arrangedDiskMap[n].length) {
        nextFreeBlockIndex = nn;
        blockToMove = arrangedDiskMap[n];
        freeBlockReplacement = new Array(arrangedDiskMap[nn].length - arrangedDiskMap[n].length).fill('.');
        oldBlockReplacement = new Array(arrangedDiskMap[n].length).fill('.');
        break;
      }
    }

    if (nextFreeBlockIndex === null) {
      continue;
    }

    arrangedDiskMap.splice(nextFreeBlockIndex, 1, blockToMove);
    arrangedDiskMap.splice(nextFreeBlockIndex + 1, 0, freeBlockReplacement);
    arrangedDiskMap.splice(n + 1, 1, oldBlockReplacement);
  }

  const filteredDisk = arrangedDiskMap
    .filter((block: string[]) => block.length > 0)
    .flat();

  return filteredDisk.reduce((sum: number, current: string, index: number) => {
    if (current === '.') {
      return sum;
    }

    return sum + (parseInt(current, 10) * index);
  }, 0);
}
