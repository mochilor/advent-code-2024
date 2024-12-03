export default function puzzle(input: string): number {
  let result = 0;
  const regexp = /mul\(\d{1,3},\d{1,3}\)/g;
  [...input.matchAll(regexp)].forEach((match: RegExpExecArray) => {
    const numbersRegExp = /(\d+),(\d+)/g;
    const numbers = [...match[0].matchAll(numbersRegExp)][0];
    result += parseInt(numbers[1], 10) * parseInt(numbers[2], 10);
  });
  return result;
}
