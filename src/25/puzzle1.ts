function parseBlock(block: string): number[] {
  const result = Array(5).fill(0);

  block.split('\n').forEach((row: string, rowIndex: number) => {
    if (rowIndex === 0) {
      return;
    }

    row.split('').forEach((cell: string, index: number) => {
      result[index] += cell === '#';
    });
  });

  return result;
}

function parseLock(lock: string): number[] {
  return parseBlock(lock);
}

function parseKey(key: string): number[] {
  const result = parseBlock(key.split('').reverse().join(''));

  return result.reverse();
}

export default function puzzle(input: string): number {
  const data = input.trim().split('\n\n');

  const keys = [];
  const locks = [];

  data.forEach((block: string) => {
    if (block[0] === '#') {
      locks.push(parseLock(block));
      return;
    }
    keys.push(parseKey(block));
  });

  let result = 0;

  keys.forEach((key: number[]) => {
    locks.forEach((lock: number[]) => {
      for (let n = 0; n < lock.length; n += 1) {
        if (key[n] + lock[n] > 5) {
          return;
        }
      }

      result += 1;
    });
  });

  return result;
}
