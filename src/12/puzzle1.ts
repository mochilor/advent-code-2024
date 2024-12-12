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
    let perimeter = 0;

    region.plots.forEach((plot: Plot) => {
      perimeter += 4;
      region.plots.forEach((otherPlot: Plot) => {
        if (plot.x === otherPlot.x && plot.y === otherPlot.y) {
          return;
        }

        // left
        if (otherPlot.x === plot.x - 1 && otherPlot.y === plot.y) {
          perimeter -= 1;
        }
        // up
        if (otherPlot.x === plot.x && otherPlot.y === plot.y - 1) {
          perimeter -= 1;
        }
        // right
        if (otherPlot.x === plot.x + 1 && otherPlot.y === plot.y) {
          perimeter -= 1;
        }
        // down
        if (otherPlot.x === plot.x && otherPlot.y === plot.y + 1) {
          perimeter -= 1;
        }
      });
    });

    result += area * perimeter;
  });

  return result;
}
