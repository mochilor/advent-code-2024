export default function puzzle(input: string): number {
  const data = input.trim().split('\n\n');

  const patternsRegexp = data[0].split(', ').sort((a: string, b: string) => b.length - a.length).join('|');
  const designs = data[1].split('\n');

  let result = 0;

  designs.forEach((design: string) => {
    const hasMatch = [...design.matchAll(new RegExp(patternsRegexp, 'g'))]
      .map((match) => match[0])
      .join('') === design;

    if (hasMatch) {
      result += 1;
    }
  });

  return result;
}
