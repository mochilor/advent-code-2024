import puzzle1 from '../src/02/puzzle1';
import puzzle2 from '../src/02/puzzle2';

test('Example input', () => {
  const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
  expect(puzzle1(input)).toBe(2);
  expect(puzzle2(input)).toBe(4);
});
