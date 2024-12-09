export default function puzzle(input: string): number {
  const arrangedDiskMap = [];
  input.split('').forEach((block: string, index: number) => {
    if (index % 2 === 0) {
      arrangedDiskMap.push(...new Array(parseInt(block, 10)).fill((index / 2).toString()));
      return;
    }

    arrangedDiskMap.push(...new Array(parseInt(block, 10)).fill('.'));
  });

  const reversedMap = [...arrangedDiskMap].reverse();
  console.log(reversedMap.length);
  for (let n = 0; n < reversedMap.length; n += 1) {
    if (arrangedDiskMap.join('').match(/^[0-9]+\.+$/)) {
      break;
    }
    if (reversedMap[n] === '.') {
      continue;
    }
    console.log(n);

    const nextFreeBlockIndex = arrangedDiskMap.indexOf('.');

    arrangedDiskMap.splice(nextFreeBlockIndex, 1, reversedMap[n]);
    arrangedDiskMap.splice(arrangedDiskMap.length - (n + 1), 1, '.');
  }

  return arrangedDiskMap.reduce((sum: number, current: string, index: number) => {
    if (current === '.') {
      return sum;
    }

    return sum + (parseInt(current, 10) * index);
  }, 0);
}
