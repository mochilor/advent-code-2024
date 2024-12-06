export default function puzzle(input: string): number {
  const rows = input.split('\n');
  const mapWidth = rows[0].length;
  const mapHeight = rows.length;
  const directions = [0, 1, 2, 3]; // up, right, down, left

  let flatMap = input.replace(/\n/g, '');
  let position = flatMap.indexOf('^');
  let direction = directions[0];
  let increment = 0;
  let debug = [];
  while (true) {
    const mapArray = flatMap.split('');
    mapArray[position] = 'X';
    flatMap = mapArray.join('');

    const currentX = position % mapWidth;
    const currentY = Math.floor(position / mapWidth);

    if (
      (currentX === mapWidth - 1 && direction === 1)
      || (currentX === 0 && direction === 3)
      || (currentY === 0 && direction === 0)
      || (currentY === mapHeight - 1 && direction === 2)
    ) {
      break;
    }

    const nextTile = flatMap.substring(position + increment, position + increment + 1);

    if (nextTile === '#') {
      direction = directions[direction + 1];
      if (direction === undefined) {
        direction = 0;
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

    position += increment;

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

  return (flatMap.match(/X/g) || []).length;
}
