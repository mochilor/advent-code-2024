export default function puzzle(input: string): number {
  const left: number[] = [];
  const right: number[] = [];

  input.split('\n').forEach((row: string) => {
    const numbers = row.split('   ');
    left.push(parseInt(numbers[0], 10));
    right.push(parseInt(numbers[1], 10));
  });

  let result = 0;

  left.forEach((id: number) => {
    const matches = right.filter((item: number) => item === id);

    result += id * matches.length;
  });

  return result;
}
