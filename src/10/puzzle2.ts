type Location = {
  x: number,
  y: number,
};

export default function puzzle(input: string): number {
  const map: number[][] = [];
  const debugMap: string[][] = [];
  const startLocations: Location[] = [];

  input.split('\n').forEach((row: string, rowIndex: number) => {
    map.push([]);
    debugMap.push([]);
    row.split('').forEach((cell: string, colIndex: number) => {
      map[rowIndex].push(parseInt(cell, 10));
      debugMap[rowIndex].push(' ');

      if (cell === '0') {
        startLocations.push({
          x: colIndex,
          y: rowIndex,
        });
      }
    });
  });

  let score = 0;

  function walk(location: Location, currentLevel: number): void {
    const { x, y } = location;
    const cell = map[y]?.[x];
    if (cell !== currentLevel) {
      return;
    }

    debugMap[y][x] = 'X';

    if (cell === 9) {
      score += 1;
      return;
    }

    // top
    walk({ x, y: y - 1 }, currentLevel + 1);
    // right
    walk({ x: x + 1, y }, currentLevel + 1);
    // down
    walk({ x, y: y + 1 }, currentLevel + 1);
    // left
    walk({ x: x - 1, y }, currentLevel + 1);
  }

  startLocations.forEach((location: Location) => {
    walk(location, 0);
  });

  return score;
}
