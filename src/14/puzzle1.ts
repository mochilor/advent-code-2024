type Vector = {
  x: number,
  y: number,
};

type Robot = {
  position: Vector,
  velocity: Vector,
};

function parseVector(data: string): Vector {
  const start = data.indexOf('=');

  const vectorData = data.slice(start + 1).split(',');

  return {
    x: parseInt(vectorData[0], 10),
    y: parseInt(vectorData[1], 10),
  };
}

export default function puzzle(input: string, width: number, height: number): number {
  const robots: Robot[] = [];

  input.trim().split('\n').forEach((row: string) => {
    const [positionString, velocityString] = row.split(' ');

    robots.push({
      position: parseVector(positionString),
      velocity: parseVector(velocityString),
    });
  });

  const field = [];
  for (let n = 0; n < height; n += 1) {
    field.push(new Array(width).fill(0));
  }

  robots.forEach((robot: Robot) => {
    field[robot.position.y][robot.position.x] += 1;
  });

  function findPosition(position: number, size: number): number {
    let result = position;
    if (result >= size) {
      result -= size;
    } else if (result < 0) {
      result = size + result;
    }

    return result;
  }

  for (let n = 0; n < 100; n += 1) {
    robots.forEach((robot: Robot) => {
      field[robot.position.y][robot.position.x] -= 1;

      const newX = findPosition(robot.position.x + robot.velocity.x, width);
      const newY = findPosition(robot.position.y + robot.velocity.y, height);

      robot.position.x = newX;
      robot.position.y = newY;

      field[newY][newX] += 1;
    });
  }

  const quadrants = [0, 0, 0, 0];

  field.forEach((row: number[], y: number) => {
    if (y === Math.floor(height / 2)) {
      return;
    }

    row.forEach((cell: number, x: number) => {
      if (x === Math.floor(width / 2)) {
        return;
      }

      let quadrant = 0;
      if (y < height / 2 && x > width / 2) {
        quadrant = 1;
      } else if (y > height / 2 && x < width / 2) {
        quadrant = 2;
      } else if (y > height / 2 && x > width / 2) {
        quadrant = 3;
      }

      quadrants[quadrant] += cell;
    });
  });

  return quadrants.reduce((total: number, current: number) => current * total, 1);
}
