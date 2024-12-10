type Location = {
  x: number,
  y: number,
};

type Goal = {
  location: Location,
  origin: Location,
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

  const reachedGoals: Goal[] = [];

  function walk(location: Location, origin: Location, currentLevel: number): void {
    const { x, y } = location;
    const cell = map[y]?.[x];
    if (cell !== currentLevel) {
      return;
    }

    debugMap[y][x] = 'X';

    if (cell === 9) {
      for (let n = 0; n < reachedGoals.length; n += 1) {
        const goal = reachedGoals[n];
        if (
          goal.location.x === x
          && goal.location.y === y
          && goal.origin.x === origin.x
          && goal.origin.y === origin.y
        ) {
          return;
        }
      }
      reachedGoals.push({
        location,
        origin,
      });
      return;
    }

    // top
    walk({ x, y: y - 1 }, origin, currentLevel + 1);
    // right
    walk({ x: x + 1, y }, origin, currentLevel + 1);
    // down
    walk({ x, y: y + 1 }, origin, currentLevel + 1);
    // left
    walk({ x: x - 1, y }, origin, currentLevel + 1);
  }

  startLocations.forEach((location: Location) => {
    walk(location, location, 0);
  });

  return reachedGoals.length;
}
