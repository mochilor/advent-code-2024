type Vector = {
  x: number,
  y: number,
};

export default function puzzle(input: string): number {
  const [mapString, movesString] = input.trim().split('\n\n');

  const map: string[][] = [];
  const robotPosition: Vector = {
    x: 0,
    y: 0,
  };

  mapString.split('\n').forEach((row: string, y: number) => {
    map[y] = [];
    row.split('').forEach((tile: string, x: number) => {
      map[y][x] = tile;
      if (tile === '@') {
        robotPosition.x = x;
        robotPosition.y = y;
      }
    });
  });

  function getIncrement(arrow: string): Vector {
    const increment = {
      x: 0,
      y: 0,
    };

    if (arrow === '<') {
      increment.x = -1;
    }
    if (arrow === '^') {
      increment.y = -1;
    }
    if (arrow === '>') {
      increment.x = 1;
    }
    if (arrow === 'v') {
      increment.y = 1;
    }

    return increment;
  }

  const moves = movesString.replaceAll('\n', '').split('');

  function moveRobot(newX: number, newY: number, increment: Vector): void {
    map[newY][newX] = '@';
    map[robotPosition.y][robotPosition.x] = '.';
    robotPosition.x += increment.x;
    robotPosition.y += increment.y;
  }

  moves.forEach((arrow: string) => {
    const increment = getIncrement(arrow);

    const newX = robotPosition.x + increment.x;
    const newY = robotPosition.y + increment.y;

    if (map[newY][newX] === '.') {
      moveRobot(newX, newY, increment);
      return;
    }

    if (map[newY][newX] === '#') {
      return;
    }

    let multiplier = 2;
    while (true) {
      const nextX = robotPosition.x + (increment.x * multiplier);
      const nextY = robotPosition.y + (increment.y * multiplier);
      if (map[nextY][nextX] === '#') {
        break;
      }

      if (map[nextY][nextX] === '.') {
        map[nextY][nextX] = 'O';
        moveRobot(newX, newY, increment);
        break;
      }

      multiplier += 1;
    }
  });

  let result = 0;

  for (let n = 0; n < map.length; n += 1) {
    for (let nn = 0; nn < map[n].length; nn += 1) {
      if (map[n][nn] === 'O') {
        result += (n * 100) + nn;
      }
    }
  }

  return result;
}
