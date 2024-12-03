export default function puzzle(input: string): number {
  function levelSetIsSafe(levels: number[]): boolean {
    let ascending = false;

    for (let n = 0; n < levels.length; n += 1) {
      if (levels[n + 1] === undefined) {
        break;
      }

      if (levels[n] === levels[n + 1]) {
        return false;
      }

      const comparision = levels[n] - levels[n + 1];
      const difference = Math.abs(comparision);

      if (difference === 0 || difference > 3) {
        return false;
      }

      if (n === 0) {
        ascending = comparision < 0;
      }

      if ((ascending && comparision > 0) || (!ascending && comparision < 0)) {
        return false;
      }
    }

    return true;
  }

  let result = 0;

  input.split('\n').forEach((row: string) => {
    const levels = row.split(' ').map((level: string) => parseInt(level, 10));

    if (levelSetIsSafe(levels)) {
      result += 1;
      return;
    }

    for (let n = 0; n < levels.length; n += 1) {
      const levelsCopy = [...levels];
      levelsCopy.splice(n, 1);
      if (levelSetIsSafe(levelsCopy)) {
        result += 1;
        return;
      }
    }
  });

  return result;
}
