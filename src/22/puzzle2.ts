type Sequence = {
  differences: number[],
  price: number,
};

type Price = {
  difference: number,
  price: number,
};

/* eslint-disable no-bitwise */
export default function puzzle(input: string, iterations: number): number {
  const initialSecrets = input.trim().split('\n').map((secret: string) => parseInt(secret, 10));

  const secretLists: number[][] = [];

  initialSecrets.forEach((secret: number, index: number) => {
    secretLists[index] = [];
    let current = secret;
    for (let n = 0; n < iterations; n += 1) {
      secretLists[index].push(current);
      const step1 = (((current * 64) ^ current) >>> 0) % 16777216;
      const step2 = ((Math.floor(step1 / 32) ^ step1) >>> 0) % 16777216;
      const lastStep = (((step2 * 2048) ^ step2) >>> 0) % 16777216;
      current = lastStep;
    }
  });

  const pricesLists: Price[][] = [];

  secretLists.forEach((secretList: number[], index: number) => {
    pricesLists[index] = [];
    secretList.forEach((secret: number, secretIndex: number) => {
      const price = secret % 10;
      if (secretList[secretIndex - 1] !== undefined) {
        const difference = price - (secretList[secretIndex - 1] % 10);
        pricesLists[index].push({
          difference,
          price,
        });
      }
    });
  });

  const sequences: Sequence[] = [];

  pricesLists[0].forEach((price: Price, index: number) => {
    const differences = [
      price.difference,
      pricesLists[0][index + 1]?.difference,
      pricesLists[0][index + 2]?.difference,
      pricesLists[0][index + 3]?.difference,
    ].filter((value: number) => value !== undefined);

    if (differences.length === 4) {
      sequences.push({
        differences,
        price: 0,
      });
    }
  });

  let result = 0;

  sequences.forEach((sequence: Sequence) => {
    for (let n = 0; n < pricesLists.length; n += 1) {
      for (let nn = 0; nn < pricesLists[n].length; nn += 1) {
        if (
          pricesLists[n][nn].difference === sequence.differences[0]
          && pricesLists[n][nn + 1]?.difference === sequence.differences[1]
          && pricesLists[n][nn + 2]?.difference === sequence.differences[2]
          && pricesLists[n][nn + 3]?.difference === sequence.differences[3]
        ) {
          sequence.price += pricesLists[n][nn + 3].price;
          break;
        }
      }
    }

    if (sequence.price > result) {
      result = sequence.price;
    }
  });

  return result;
}
