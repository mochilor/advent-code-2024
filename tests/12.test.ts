import puzzle1 from '../src/12/puzzle1';
import puzzle2 from '../src/12/puzzle2';

describe('Testing several inputs', () => {
  test('Example input 1', () => {
    const input = `
AAAA
BBCD
BBCC
EEEC`;
    expect(puzzle1(input)).toBe(140);
  });

  test('Example input 2', () => {
    const input = `
RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;
    expect(puzzle1(input)).toBe(1930);
    expect(puzzle2(input)).toBe(1206);
  });
});
