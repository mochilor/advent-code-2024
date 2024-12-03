import puzzle1 from '../src/03/puzzle1';
import puzzle2 from '../src/03/puzzle2';

test('Example input', () => {
  const input = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
  expect(puzzle1(input)).toBe(161);
  expect(puzzle2(input)).toBe(48);
});
