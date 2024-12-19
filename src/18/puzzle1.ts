/**
 * A* algorithm as explained here: https://dev.to/codesphere/pathfinding-with-javascript-the-a-algorithm-3jlb
 */

type Vector = {
  x: number,
  y: number,
};

class Cell {
  private neighborCells: Cell[] = [];

  private gValue = 0; // cost from start

  private hValue = 0; // estimated cost to the end

  private parentCell: Cell = null;

  constructor(
    public readonly x: number,
    public readonly y: number,
  ) {}

  public setG(g: number): void {
    this.gValue = g;
  }

  public setH(h: number): void {
    this.hValue = h;
  }

  public f(): number {
    return this.gValue + this.hValue;
  }

  public g(): number {
    return this.gValue;
  }

  public parent(): Cell | null {
    return this.parentCell;
  }

  public setParent(parent: Cell): void {
    this.parentCell = parent;
  }

  public neighbors(): Cell[] {
    return this.neighborCells;
  }

  public updateNeighbors(map: Cell[][]): void {
    const topCell = map[this.y - 1]?.[this.x];
    if (topCell) {
      this.neighborCells.push(topCell);
    }

    const rightCell = map[this.y]?.[this.x + 1];
    if (rightCell) {
      this.neighborCells.push(rightCell);
    }

    const downCell = map[this.y + 1]?.[this.x];
    if (downCell) {
      this.neighborCells.push(downCell);
    }

    const leftCell = map[this.y]?.[this.x - 1];
    if (leftCell) {
      this.neighborCells.push(leftCell);
    }
  }
}

const debugMap: string[][] = [];

function debug(map: Cell[][], closedSet: Cell[]): void {
  map.forEach((row: (Cell | null)[], y: number) => {
    debugMap[y] = [];
    row.forEach((cell: Cell | null, x: number) => {
      if (cell === null) {
        debugMap[y][x] = '#';
        return;
      }

      if (closedSet.includes(cell)) {
        debugMap[y][x] = cell.f().toString();
        return;
      }

      debugMap[y][x] = '.';
    });
  });
}

function heuristic(position0: Vector, position1: Vector): number {
  return Math.abs(position1.x - position0.x) + Math.abs(position1.y - position0.y);
}

function search(map: Cell[][]): Cell[] {
  const openSet: Cell[] = [];
  const closedSet: Cell[] = [];
  const end = map[map.length - 1][map[0].length - 1];

  openSet.push(map[0][0]);

  while (openSet.length) {
    debug(map, closedSet);
    let lowestIndex = 0;
    openSet.forEach((cell: Cell, index: number) => {
      if (cell.f() < openSet[lowestIndex].f()) {
        lowestIndex = index;
      }
    });

    const current = openSet[lowestIndex];

    if (current.x === end.x && current.y === end.y) {
      const path = [];
      let temp = current;
      path.push(temp);
      while (temp.parent()) {
        path.push(temp.parent());
        temp = temp.parent();
      }

      return path.reverse();
    }

    openSet.splice(lowestIndex, 1);
    closedSet.push(current);

    current.neighbors().forEach((neighbor: Cell) => {
      if (closedSet.includes(neighbor)) {
        return;
      }

      const possibleG = current.g() + 1;

      if (!openSet.includes(neighbor)) {
        openSet.push(neighbor);
      } else if (possibleG >= neighbor.g()) {
        return;
      }

      neighbor.setG(possibleG);
      neighbor.setH(heuristic(neighbor, end));
      neighbor.setParent(current);
    });
  }

  return [];
}

export default function puzzle(
  input: string,
  mapWidth: number,
  mapHeight: number,
  maxBytes: number,
): number {
  const bytePositions: Vector[] = input.trim().split('\n').map((row: string) => {
    const data = row.split(',');

    return {
      x: parseInt(data[0], 10),
      y: parseInt(data[1], 10),
    };
  });

  const map: (Cell | null)[][] = [];

  for (let y = 0; y < mapHeight; y += 1) {
    map[y] = [];
    for (let x = 0; x < mapWidth; x += 1) {
      for (let n = 0; n < maxBytes; n += 1) {
        if (bytePositions[n].x === x && bytePositions[n].y === y) {
          map[y][x] = null;
          break;
        }
      }

      if (map[y][x] !== null) {
        map[y][x] = new Cell(x, y);
      }
    }
  }

  map.forEach((cells: (Cell | null)[]) => {
    cells.forEach((cell: Cell | null) => {
      if (cell) {
        cell.updateNeighbors(map);
      }
    });
  });

  return search(map).length - 1;
}
