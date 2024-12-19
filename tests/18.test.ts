import puzzle1 from '../src/18/puzzle1';
import puzzle2 from '../src/18/puzzle2';

test('Example input 1', () => {
  const input = `
5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0
`;
  // expect(puzzle1(input, 7, 7, 12)).toBe(22);
  expect(puzzle2(input, 7, 7, 12)).toBe('6,1');
});
