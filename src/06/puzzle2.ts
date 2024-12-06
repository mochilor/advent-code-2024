// This slows execution a lot
const debugEnabled = false;

function makeFlatMap(input: string): string {
  return input.replace(/\n/g, '');
}

function replaceTile(map: string, obstaclePosition: number, tile: string): string {
  const arrayMap = map.split('');
  arrayMap[obstaclePosition] = tile;
  return arrayMap.join('');
}

export default function puzzle(input: string): number {
  const rows = input.split('\n');
  const mapWidth = rows[0].length;
  const mapHeight = rows.length;
  const directions = [0, 1, 2, 3]; // up, right, down, left
  let loops = 0;
  let flatMap = makeFlatMap(input);

  function walk(obstaclePosition: number): void {
    // console.log(obstaclePosition);
    const turns = [];
    let direction = directions[0];
    let increment = 0;

    flatMap = makeFlatMap(input);

    if (flatMap[obstaclePosition] === '^' || flatMap[obstaclePosition] === '#') {
      return;
    }

    flatMap = replaceTile(flatMap, obstaclePosition, '#');

    let position = flatMap.indexOf('^');

    function nextTileIsFree(): boolean {
      return flatMap.substring(position + increment, position + increment + 1) !== '#';
    }

    let debug = [];

    while (true) {
      const currentX = position % mapWidth;
      const currentY = Math.floor(position / mapWidth);

      if (
        (currentX === mapWidth - 1 && direction === 1)
        || (currentX === 0 && direction === 3)
        || (currentY === 0 && direction === 0)
        || (currentY === mapHeight - 1 && direction === 2)
      ) {
        return;
      }

      if (turns.indexOf(position) !== -1 && !nextTileIsFree()) {
        loops += 1;
        return;
      }

      if (debugEnabled) {
        flatMap = replaceTile(flatMap, position, 'X');
      }

      let blocked = true;
      while (blocked) {
        if (!nextTileIsFree()) {
          turns.push(position);
          direction = directions[direction + 1];
          if (direction === undefined) {
            [direction] = directions;
          }
        }

        switch (direction) {
          case 0: // up
            increment = -mapWidth;
            break;
          case 1: // right
            increment = 1;
            break;
          case 2: // down
            increment = mapWidth;
            break;
          case 3: // down
            increment = -1;
            break;
          default:
            increment = 0;
        }

        if (nextTileIsFree()) {
          blocked = false;
        }
      }

      position += increment;

      if (debugEnabled) {
        debug = [];
        let currentRow = 0;
        for (let n = 0; n < flatMap.length; n += 1) {
          if (n > 0 && n % mapWidth === 0) {
            currentRow += 1;
          }
          if (debug[currentRow] === undefined) {
            debug[currentRow] = '';
          }
          debug[currentRow] += flatMap[n];
        }
      }
    }
  }

  for (let n = 0; n < flatMap.length; n += 1) {
    walk(n);
  }

  return loops;
}
