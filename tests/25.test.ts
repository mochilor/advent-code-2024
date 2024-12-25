import puzzle1 from '../src/25/puzzle1';
import puzzle2 from '../src/25/puzzle2';

test('Example input 1', () => {
  const input = `
#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;
  expect(puzzle1(input)).toBe(3);
});