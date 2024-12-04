import puzzle1 from '../src/04/puzzle1';
import puzzle2 from '../src/04/puzzle2';

test('Example input', () => {
  const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
  expect(puzzle1(input)).toBe(18);
  expect(puzzle2(input)).toBe(9);
});
