import puzzle1 from '../src/23/puzzle1';
import puzzle2 from '../src/23/puzzle2';

test('Example input 1', () => {
  const input = `
kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn
`;
  expect(puzzle1(input)).toBe(7);
  // expect(puzzle2(input)).toBe(6);
});
