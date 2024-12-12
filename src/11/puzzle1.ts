function blink(stones: number[]): number[] {
  const result = [];

  stones.forEach((stone: number) => {
    if (stone === 0) {
      result.push(1);
      return;
    }

    if (stone.toString().length % 2 === 0) {
      const numberString = stone.toString();
      const { length } = numberString;
      result.push(parseInt(numberString.slice(0, length / 2), 10));
      result.push(parseInt(numberString.slice(length / 2), 10));
      return;
    }

    result.push(stone * 2024);
  });

  return result;
}

export default function puzzle(input: string): number {
  let stones = input.split(' ').map((number: string) => parseInt(number, 10));

  for (let n = 0; n < 25; n += 1) {
    stones = blink(stones);
  }

  return stones.length;
}
