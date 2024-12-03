function multiply(multiplication: RegExpExecArray): number {
  const numbersRegExp = /(\d+),(\d+)/g;
  const numbers = [...multiplication[0].matchAll(numbersRegExp)][0];
  return parseInt(numbers[1], 10) * parseInt(numbers[2], 10);
}

export default function puzzle(input: string): number {
  let result = 0;

  let enabled = true;

  const regexp = /(mul\(\d{1,3},\d{1,3}\))|(do(n't)?\(\))/g;
  const matches = [...input.matchAll(regexp)];

  matches.forEach((match: RegExpExecArray) => {
    const doRegExp = /do\(\)/;
    const dontRegExp = /do(n't)\(\)/;

    if (match[0].match(doRegExp)) {
      enabled = true;
      return;
    }

    if (match[0].match(dontRegExp)) {
      enabled = false;
      return;
    }

    if (!enabled) {
      return;
    }

    const multiplicationRegExp = /mul\(\d{1,3},\d{1,3}\)/g;

    const multiplication = [...match[0].matchAll(multiplicationRegExp)][0];
    result += multiply(multiplication);
  });

  return result;
}
