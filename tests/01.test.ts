import puzzle1 from '../src/01/puzzle1';
import puzzle2 from '../src/01/puzzle2';

test('Example input', () => {
  const input = `3   4
4   3
2   5
1   3
3   9
3   3`;
  expect(puzzle1(input)).toBe(11);
  expect(puzzle2(input)).toBe(31);
});
