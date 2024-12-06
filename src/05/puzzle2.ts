function pageBreaksRule(page: string, previousPage: string, rules: string[]): boolean {
  const rule = `${page}|${previousPage}`;
  if (rules.indexOf(rule) !== -1) {
    return true;
  }

  return false;
}

function sort(update: string[], rules: string[]): string[] {
  let needsAnotherRun = true;
  while (needsAnotherRun) {
    needsAnotherRun = false;
    for (let n = 0; n < update.length; n += 1) {
      let previousPages = update.slice(0, n);
      for (let nn = 0; nn < previousPages.length; nn += 1) {
        if (pageBreaksRule(update[n], previousPages[nn], rules)) {
          update.splice(nn, 1);
          update.splice(n, 0, previousPages[nn]);
          previousPages = update.slice(0, n);
          needsAnotherRun = true;
        }
      }
    }
  }

  return update;
}

function isValid(update: string[], rules: string[]): boolean {
  for (let n = 1; n < update.length; n += 1) {
    const page = update[n];
    const previousPages = update.slice(0, n);

    for (let nn = 0; nn < previousPages.length; nn += 1) {
      if (pageBreaksRule(page, previousPages[nn], rules)) {
        return false;
      }
    }
  }

  return true;
}

export default function puzzle(input: string): number {
  const data = input.split('\n\n');

  const rules = data[0].split('\n');
  const updates = data[1].split('\n').map((update: string) => update.split(','));

  let result = 0;

  updates.forEach((update: string[]) => {
    if (!isValid(update, rules)) {
      const sortedUpdate = sort(update, rules);
      result += parseInt(sortedUpdate[Math.floor(sortedUpdate.length / 2)], 10);
    }
  });

  return result;
}
