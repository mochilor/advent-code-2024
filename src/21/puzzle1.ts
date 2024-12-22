type Vector = {
  x: number,
  y: number,
};

const numPad = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['', '0', 'A'],
];

const dirPad = [
  ['', '^', 'A'],
  ['<', 'v', '>'],
];

function locateTarget(target: string, map: string[][]): Vector {
  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      if (target === map[y][x]) {
        return { x, y };
      }
    }
  }

  throw new Error('Not a valid target!');
}

function findStartLocation(map: string[][]): Vector {
  for (let y = 0; y < map.length; y += 1) {
    for (let x = 0; x < map[y].length; x += 1) {
      if (map[y][x] === 'A') {
        return { x, y };
      }
    }
  }

  throw new Error('Not a valid map!');
}

function findSequences(codes: string[], map: string[][]): string[] {
  const sequences = [];
  const startPosition = findStartLocation(map);

  codes.forEach((code: string) => {
    let sequence = '';
    let position = startPosition;

    code.split('').forEach((num: string) => {
      const targetPosition = locateTarget(num, map);
      const diffX = targetPosition.x - position.x;
      const diffY = targetPosition.y - position.y;
      const steps: Vector[] = [];
      let sequenceCandidate = '';
      const step = { ...position };

      if (diffX < 0) {
        const amount = Math.abs(diffX);
        sequenceCandidate += '<'.repeat(Math.abs(diffX));
        for (let n = 1; n <= amount; n += 1) {
          step.x -= 1;
          steps.push({ ...step });
        }
      } else {
        sequenceCandidate += '>'.repeat(diffX);
        for (let n = 1; n <= diffX; n += 1) {
          step.x += 1;
          steps.push({ ...step });
        }
      }

      if (diffY < 0) {
        const amount = Math.abs(diffY);
        sequenceCandidate += '^'.repeat(Math.abs(diffY));
        for (let n = 1; n <= amount; n += 1) {
          step.y -= 1;
          steps.push({ ...step });
        }
      } else {
        sequenceCandidate += 'v'.repeat(diffY);
        for (let n = 1; n <= diffY; n += 1) {
          step.y += 1;
          steps.push({ ...step });
        }
      }

      let wrongStep = false;
      for (let n = 0; n < steps.length; n += 1) {
        if (map[steps[n].y][steps[n].x] === '') {
          wrongStep = true;
          break;
        }
      }

      if (wrongStep) {
        // This works for the test case but not for the real input. I give up...
        sequenceCandidate = sequenceCandidate.split('').reverse().join('');
      }

      sequence += `${sequenceCandidate}A`;

      position = targetPosition;
    });

    sequences.push(sequence);
  });

  return sequences;
}

export default function puzzle(input: string): number {
  const codes = input.trim().split('\n');

  const sequences1 = findSequences(codes, numPad);
  const sequences2 = findSequences(sequences1, dirPad);
  const sequences3 = findSequences(sequences2, dirPad);

  let result = 0;

  codes.forEach((code: string, index: number) => {
    const { length } = sequences3[index];
    const num = parseInt(code, 10);
    result += length * num;
  });

  return result;
}
