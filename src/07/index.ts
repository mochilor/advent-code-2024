import puzzle1 from './puzzle1';
import puzzle2 from './puzzle2';
import readFile from '../input';

const input = readFile('07');
console.log();
console.log('DAY 7');
console.log('Puzzle 1: ', puzzle1(input));
console.log('Puzzle 2: ', puzzle2(input));