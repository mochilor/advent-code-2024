type Vector = {
  x: number,
  y: number,
};

type Machine = {
  buttonA: Vector,
  buttonB: Vector,
  prize: Vector,
};

function parseMachineRow(row: string): Vector {
  const data = (row.split(': ')[1]).split(', ');

  return {
    x: parseInt(data[0].match(/\d+/)[0], 10),
    y: parseInt(data[1].match(/\d+/)[0], 10),
  };
}

function parseMachine(data: string): Machine {
  const rows = data.split('\n');

  return {
    buttonA: parseMachineRow(rows[0]),
    buttonB: parseMachineRow(rows[1]),
    prize: parseMachineRow(rows[2]),
  };
}

function pressButtons(buttonA: Vector, buttonB: Vector, prize: Vector): number {
  for (let n = 0; n < 100; n += 1) {
    for (let nn = 0; nn < 100; nn += 1) {
      const x = (n * buttonA.x) + (nn * buttonB.x);
      const y = (n * buttonA.y) + (nn * buttonB.y);
      if (x === prize.x && y === prize.y) {
        return (n * 3) + nn;
      }
    }
  }

  return 0;
}

export default function puzzle(input: string): number {
  const machines: Machine[] = [];
  input.trim().split('\n\n').forEach((machineData: string) => {
    machines.push(parseMachine(machineData));
  });

  let result = 0;

  machines.forEach((machine: Machine) => {
    result += pressButtons(machine.buttonA, machine.buttonB, machine.prize);
  });

  return result;
}
