export default function puzzle(input: string): number {
  const left: number[] = [];
  const right: number[] = [];

  input.split('\n').forEach((row: string) => {
    const numbers = row.split('   ');
    left.push(parseInt(numbers[0], 10));
    right.push(parseInt(numbers[1], 10));
  });

  left.sort();
  right.sort();

  let result = 0;

  left.forEach((id: number, key: number) => {
    result += Math.abs(id - right[key]);
  });

  return result;
}
