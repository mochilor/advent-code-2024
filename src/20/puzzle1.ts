type Vector = {
  x: number,
  y: number,
};

type Cell = {
  position: Vector,
  index: number,
};

export default function puzzle(input: string, saving: number): number {
  const map: string[][] = [];
  const debug: string[][] = [];
  let start: Vector;
  let end: Vector;
  const cells: Cell[] = [];

  input.trim().split('\n').forEach((row: string, y: number) => {
    map[y] = [];
    debug[y] = [];
    row.split('').forEach((dot: string, x: number) => {
      if (dot === 'S') {
        start = { x, y };
      } else if (dot === 'E') {
        end = { x, y };
      }
      const newDot = dot === 'S' || dot === 'E' || dot === '.' ? '.' : '#';
      map[y][x] = newDot;
      debug[y][x] = newDot;
    });
  });

  cells.push({
    position: start,
    index: 0,
  });

  const directions = [
    {
      x: 0,
      y: -1,
    },
    {
      x: 1,
      y: 0,
    },
    {
      x: 0,
      y: 1,
    },
    {
      x: -1,
      y: 0,
    },
  ];

  let endReached = false;

  function doDebug(cell: Cell): void {
    for (let y = 0; y < debug.length; y += 1) {
      for (let x = 0; x < debug[y].length; x += 1) {
        if (debug[y][x] !== '#') {
          debug[y][x] = '.';
        }
      }
    }

    debug[cell.position.y][cell.position.x] = '@';
  }

  while (!endReached) {
    const cell = cells[cells.length - 1];

    doDebug(cell);

    for (let n = 0; n < directions.length; n += 1) {
      const newX = cell.position.x + directions[n].x;
      const newY = cell.position.y + directions[n].y;
      const candidate = map[newY][newX];

      if (candidate !== '#') {
        const newCell = {
          position: {
            x: newX,
            y: newY,
          },
          index: cell.index + 1,
        };

        let valid = true;

        for (let c = 0; c < cells.length; c += 1) {
          if (
            newCell.position.x === cells[c].position.x
            && newCell.position.y === cells[c].position.y
          ) {
            valid = false;
            break;
          }
        }

        if (valid) {
          if (newY === end.y && newX === end.x) {
            endReached = true;
          }
          cells.push(newCell);
          break;
        }
      }
    }
  }

  const cheats: number[] = [];

  cells.forEach((cell: Cell) => {
    for (let n = 0; n < directions.length; n += 1) {
      const newX = cell.position.x + directions[n].x;
      const newY = cell.position.y + directions[n].y;
      const nextX = newX + directions[n].x;
      const nextY = newY + directions[n].y;

      if (map[newY]?.[newX] === '#' && map[nextY]?.[nextX] !== '#') {
        for (let c = 0; c < cells.length; c += 1) {
          const anotherCell = cells[c];
          if (anotherCell.position.x === nextX && anotherCell.position.y === nextY) {
            if (anotherCell.index > cell.index) {
              cheats.push(anotherCell.index - cell.index - 2);
            }
            break;
          }
        }
      }
    }

    doDebug(cell);
  });

  cheats.sort((a, b) => a - b);

  return cheats.filter((value: number) => value >= saving).length;
}
