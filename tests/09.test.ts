import puzzle1 from '../src/09/puzzle1';
import puzzle2 from '../src/09/puzzle2';

describe('Testing several inputs', () => {
  test('Example input 1', () => {
    const input = '12345';
    expect(puzzle1(input)).toBe(60);
  });

  test('Example input 2', () => {
    const input = '2333133121414131402';
    expect(puzzle1(input)).toBe(1928);
    expect(puzzle2(input)).toBe(2858);
  });
});
