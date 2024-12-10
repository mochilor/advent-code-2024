import puzzle1 from '../src/10/puzzle1';
import puzzle2 from '../src/10/puzzle2';

describe('Testing several inputs', () => {
  test('Example input 1', () => {
    const input = `0123
1234
8765
9876`;
    expect(puzzle1(input)).toBe(1);
  });

  test('Example input 2', () => {
    const input = `9990999
9991999
9992999
6543456
7111117
8111118
9111119`;
    expect(puzzle1(input)).toBe(2);
  });

  test('Example input 3', () => {
    const input = `7790559
7771598
1772917
6543456
7651987
8761111
9871111`;
    expect(puzzle1(input)).toBe(4);
  });

  test('Example input 4', () => {
    const input = `1051911
2511811
3999711
4567654
1118113
1119552
1111901`;
    expect(puzzle1(input)).toBe(3);
  });

  test('Example input 5', () => {
    const input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;
    expect(puzzle1(input)).toBe(36);
    expect(puzzle2(input)).toBe(81);
  });

  test('Example input 6', () => {
    const input = `1190119
9991598
1112117
6543456
7651987
8761111
9871111`;
    expect(puzzle2(input)).toBe(13);
  });

  test('Example input 7', () => {
    const input = `012345
123456
234567
345678
416789
567891`;
    expect(puzzle2(input)).toBe(227);
  });
});
