const allowedOperators = ['+', '*'];

export default function puzzle(input: string): number {
  const equations = input.split('\n');

  const results = equations.map((equation: string) => {
    const equationArray = equation.split(': ');
    const expectedResult = parseInt(equationArray[0], 10);
    const numbers = equationArray[1].split(' ').map((number: string) => parseInt(number, 10));
    const operatorsArray = new Array(numbers.length - 1).fill(allowedOperators);

    // Stolen from SO, sorry :_(
    const operatorCombinations = operatorsArray.reduce(
      (accumulator: [], current: string[]) => accumulator.map(
        (operators: string[]) => current.map(
          (operator: string) => operators.concat(operator),
        ),
      ).reduce((accumulator2, current2) => accumulator2.concat(current2), []),
      [[]],
    );

    for (let n = 0; n < operatorCombinations.length; n += 1) {
      const result = numbers.reduce((accumulator: number, current: number, index: number) => {
        if (index === 0) {
          return current;
        }

        return operatorCombinations[n][index - 1] === '+' ? accumulator + current : accumulator * current;
      }, 0);

      if (result === expectedResult) {
        return result;
      }
    }

    return 0;
  });

  return results.reduce((accumulator: number, current: number) => accumulator + current, 0);
}
