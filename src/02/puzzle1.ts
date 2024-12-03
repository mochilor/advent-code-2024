export default function puzzle(input: string): number {
  let result = 0;

  input.split('\n').forEach((row: string) => {
    const levels = row.split(' ');

    let ascending = false;

    for (let n = 0; n < levels.length; n += 1) {
      if (levels[n + 1] === undefined) {
        break;
      }

      if (levels[n] === levels[n + 1]) {
        return;
      }

      const comparision = parseInt(levels[n], 10) - parseInt(levels[n + 1], 10);
      const difference = Math.abs(comparision);

      if (difference === 0 || difference > 3) {
        return;
      }

      if (n === 0) {
        ascending = comparision < 0;
      }

      if ((ascending && comparision > 0) || (!ascending && comparision < 0)) {
        return;
      }
    }

    result += 1;
  });

  return result;
}
