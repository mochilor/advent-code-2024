import puzzle1 from '../src/20/puzzle1';
import puzzle2 from '../src/20/puzzle2';

test('Example input 1', () => {
  const input = `
###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############
`;
  expect(puzzle1(input, 1)).toBe(44);
  expect(puzzle1(input, 12)).toBe(8);
  expect(puzzle1(input, 40)).toBe(2);
  expect(puzzle1(input, 100)).toBe(0);
});
