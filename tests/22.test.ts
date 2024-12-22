import puzzle1 from '../src/22/puzzle1';
import puzzle2 from '../src/22/puzzle2';

describe('Testing several inputs', () => {
  test('Example input 1', () => {
    const input = `
123
`;
    expect(puzzle1(input, 10)).toBe(5908254);
    expect(puzzle2(input, 10)).toBe(6);
  });

  test('Example input 2', () => {
    const input = `
1
10
100
2024
`;
    expect(puzzle1(input, 2000)).toBe(37327623);
  });

  test('Example input 3', () => {
    const input = `
1
2
3
2024
`;
    expect(puzzle2(input, 2000)).toBe(23);
  });
});
