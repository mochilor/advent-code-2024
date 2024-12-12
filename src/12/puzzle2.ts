type Plot = {
  x: number,
  y: number,
  letter: string,
};

type Region = {
  letter: string,
  plots: Plot[],
};

export default function puzzle(input: string): number {
  const regions: Region[] = [];

  const map = input.trim().split('\n').map((row: string) => row.split(''));

  function findRegion(x: number, y: number): Region | null {
    for (let n = 0; n < regions.length; n += 1) {
      for (let nn = 0; nn < regions[n].plots.length; nn += 1) {
        if (regions[n].plots[nn].x === x && regions[n].plots[nn].y === y) {
          return regions[n];
        }
      }
    }

    return null;
  }

  function walk(x: number, y: number, region: Region): void {
    const letter = map[y]?.[x];
    if (letter !== region.letter) {
      return;
    }

    for (let n = 0; n < region.plots.length; n += 1) {
      if (region.plots[n].x === x && region.plots[n].y === y) {
        return;
      }
    }

    region.plots.push({
      x,
      y,
      letter,
    });

    walk(x - 1, y, region);
    walk(x, y - 1, region);
    walk(x + 1, y, region);
    walk(x, y + 1, region);
  }

  map.forEach((row: string[], y: number) => {
    row.forEach((letter: string, x: number) => {
      if (findRegion(x, y)) {
        return;
      }

      const region = {
        letter,
        plots: [],
      };

      regions.push(region);

      walk(x, y, region);
    });
  });

  let result = 0;
  regions.forEach((region: Region) => {
    const area = region.plots.length;
    let corners = 0;
    const plots = [];
    region.plots.forEach((plot: Plot) => {
      if (plots[plot.y] === undefined) {
        plots[plot.y] = [];
      }

      plots[plot.y][plot.x] = plot;
    });

    region.plots.forEach((plot: Plot) => {
      const top = plots[plot.y - 1]?.[plot.x] !== undefined;
      const right = plots[plot.y][plot.x + 1] !== undefined;
      const bottom = plots[plot.y + 1]?.[plot.x] !== undefined;
      const left = plots[plot.y][plot.x - 1] !== undefined;
      const topLeft = plots[plot.y - 1]?.[plot.x - 1] !== undefined;
      const topRight = plots[plot.y - 1]?.[plot.x + 1] !== undefined;
      const bottomLeft = plots[plot.y + 1]?.[plot.x - 1] !== undefined;
      const bottomRight = plots[plot.y + 1]?.[plot.x + 1] !== undefined;

      if (!top && !left) {
        corners += 1;
      }
      if (!left && !bottom) {
        corners += 1;
      }
      if (!bottom && !right) {
        corners += 1;
      }
      if (!right && !top) {
        corners += 1;
      }

      if (!top && left && topLeft) {
        corners += 1;
      }
      if (!bottom && left && bottomLeft) {
        corners += 1;
      }
      if (!bottom && right && bottomRight) {
        corners += 1;
      }
      if (!top && right && topRight) {
        corners += 1;
      }
    });

    result += area * corners;
  });

  return result;
}
