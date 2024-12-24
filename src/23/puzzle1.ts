export default function puzzle(input: string): number {
  const pairs = input.trim().split('\n').map((row: string) => [row.substring(0, 2), row.substring(3)]);
  // .filter((row: string) => row.match(/(^t)|(-t)/));

  const cliques = [];

  pairs.forEach((pair: [string, string], index: number) => {
    const candidate = pair[0];
    const neighbor = pair[1];

    for (let n = 0; n < pairs.length; n += 1) {
      if (n === index) {
        continue;
      }

      if (pairs[n].includes(neighbor)) {
        const otherNeighbor = pairs[n][0] === neighbor ? pairs[n][1] : pairs[n][0];
        for (let nn = 0; nn < pairs.length; nn += 1) {
          if (nn === index || nn === n) {
            continue;
          }

          if (pairs[nn].includes(otherNeighbor) && pairs[nn].includes(candidate)) {
            const clique = [candidate, neighbor, otherNeighbor].sort().join(',');
            if (!cliques.includes(clique)) {
              cliques.push(clique);
            }
            break;
          }
        }
      }
    }
  });

  cliques.sort();

  return cliques.filter((clique: string) => clique.match(/(t[a-z])/)).length;
}
