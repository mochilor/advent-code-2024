import puzzle1 from '../src/17/puzzle1';
import puzzle2 from '../src/17/puzzle2';

test('Example input 1', () => {
  const input = `
Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0
`;
  expect(puzzle1(input)).toBe('4,6,3,5,6,3,5,2,1,0');
});

test('Example input 2', () => {
  const input = `
Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0
`;
  // expect(puzzle1(input)).toBe('4,6,3,5,6,3,5,2,1,0');
  expect(puzzle2(input)).toBe(117440);
});
