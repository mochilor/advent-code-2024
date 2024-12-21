import puzzle1 from '../src/19/puzzle1';
import puzzle2 from '../src/19/puzzle2';

test('Example input 1', () => {
  const input = `
r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb
`;
  expect(puzzle1(input)).toBe(6);
});
