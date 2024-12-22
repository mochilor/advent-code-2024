import puzzle1 from '../src/21/puzzle1';
import puzzle2 from '../src/21/puzzle2';

test('Example input 1', () => {
  const input = `
029A
980A
179A
456A
379A
`;
  expect(puzzle1(input)).toBe(126384);
});
