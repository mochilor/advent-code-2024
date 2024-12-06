export default function puzzle(input: string): number {
  const data = input.split('\n\n');

  const rules = data[0].split('\n');
  const updates = data[1].split('\n').map((update: string) => update.split(','));

  let result = 0;

  updates.forEach((update: string[]) => {
    let isValid = true;
    for (let n = 1; n < update.length; n += 1) {
      const page = update[n];
      const previousPages = update.slice(0, n);

      for (let nn = 0; nn < previousPages.length; nn += 1) {
        const rule = `${page}|${previousPages[nn]}`;
        if (rules.indexOf(rule) !== -1) {
          isValid = false;
          break;
        }
      }
    }

    if (isValid) {
      result += parseInt(update[Math.floor(update.length / 2)], 10);
    }
  });

  return result;
}
