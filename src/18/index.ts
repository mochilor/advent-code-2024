import puzzle1 from './puzzle1';
import puzzle2 from './puzzle2';
import readFile from '../input';

const input = readFile('18');
console.log();
console.log('DAY 18');
console.log('Puzzle 1: ', puzzle1(input, 71, 71, 1024));
console.log('Puzzle 2: ', puzzle2(input, 71, 71, 1024));