import puzzle1 from '../src/11/puzzle1';
import puzzle2 from '../src/11/puzzle2';

test('Example input', () => {
  const input = '125 17';
  // expect(puzzle1(input)).toBe(55312);
  expect(puzzle2(input)).toBe(55312);
});
