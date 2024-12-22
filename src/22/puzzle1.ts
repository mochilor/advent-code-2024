/* eslint-disable no-bitwise */
export default function puzzle(input: string, iterations: number): number {
  const initialSecrets = input.trim().split('\n').map((secret: string) => parseInt(secret, 10));

  const secretList = [];

  initialSecrets.forEach((secret: number) => {
    let current = secret;
    for (let n = 0; n < iterations; n += 1) {
      const step1 = (((current * 64) ^ current) >>> 0) % 16777216;
      const step2 = ((Math.floor(step1 / 32) ^ step1) >>> 0) % 16777216;
      const lastStep = (((step2 * 2048) ^ step2) >>> 0) % 16777216;
      current = lastStep;
    }

    secretList.push(current);
  });

  return secretList.reduce(
    (total: number, current: number) => total + current,
    0,
  );
}
