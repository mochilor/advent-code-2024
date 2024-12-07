const allowedOperators = ['+', '*', '||'];

export default function puzzle(input: string): number {
  const equations = input.split('\n');

  const results = equations.map((equation: string, id: number) => {
    console.log(id);
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
      let testResult = numbers[0];
      for (let nn = 1; nn < numbers.length; nn += 1) {
        const currentOperator = operatorCombinations[n][nn - 1];

        if (currentOperator === '||') {
          testResult = parseInt(testResult.toString() + numbers[nn].toString(), 10);
        } else if (currentOperator === '+') {
          testResult += numbers[nn];
        } else {
          testResult *= numbers[nn];
        }

        if (testResult > expectedResult) {
          break;
        }
      }

      if (testResult === expectedResult) {
        return testResult;
      }
    }

    return 0;
  });

  return results.reduce((accumulator: number, current: number) => accumulator + current, 0);
}
