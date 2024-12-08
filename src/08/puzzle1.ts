const debugMode = false;

export default function puzzle(input: string): number {
  const rows = input.split('\n');
  const mapWidth = rows[0].length;
  const mapHeight = rows.length;
  const flatMap = input.replace(/\n/g, '');
  const mapArray = flatMap.split('');
  const antennas: string[] = [];
  let debug = input;
  const nodes = [];

  function calculateNodes(antenna1Location: number, antenna2Location: number): void {
    const antenna1X = antenna1Location % mapWidth;
    const antenna1Y = Math.floor(antenna1Location / mapHeight);
    const antenna2X = antenna2Location % mapWidth;
    const antenna2Y = Math.floor(antenna2Location / mapHeight);

    const possibleNodes = [
      {
        x: antenna1X - (antenna2X - antenna1X),
        y: antenna1Y - (antenna2Y - antenna1Y),
      },
      {
        x: antenna2X + (antenna2X - antenna1X),
        y: antenna2Y + (antenna2Y - antenna1Y),
      },
    ];

    possibleNodes.forEach((possibleNode: { x: number, y: number }) => {
      const { x, y } = possibleNode;
      const nodeLocation = y * (mapHeight + 1) + x;

      if (
        nodes.indexOf(nodeLocation) !== -1
        || (x < 0 || x >= mapWidth)
        || (y < 0 || y >= mapHeight)
      ) {
        return;
      }

      nodes.push(nodeLocation);

      if (debugMode) {
        const debugArray = debug.split('');
        debugArray.splice(nodeLocation, 1, '#');
        debug = debugArray.join('');
      }
    });
  }

  function findNodes(indices: number[]): void {
    const checked = [];
    for (let n = 0; n < indices.length; n += 1) {
      const current = indices[n];
      checked.push(indices[n]);
      for (let nn = 0; nn < indices.length; nn += 1) {
        if (checked.indexOf(indices[nn]) === -1) {
          calculateNodes(current, indices[nn]);
        }
      }
    }
  }

  mapArray.forEach((spot : string) => {
    if (spot !== '.' && antennas.indexOf(spot) === -1) {
      antennas.push(spot);
      const indices = [];
      const regex = new RegExp(spot, 'g');
      while (true) {
        const found = regex.exec(flatMap);
        if (!found) {
          break;
        }
        indices.push(found.index);
      }

      findNodes(indices);
    }
  });

  return nodes.length;
}
