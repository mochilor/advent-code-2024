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
  const price = parseMachineRow(rows[2]);

  return {
    buttonA: parseMachineRow(rows[0]),
    buttonB: parseMachineRow(rows[1]),
    prize: {
      x: price.x + 10000000000000,
      y: price.y + 10000000000000,
    },
  };
}

// I would NEVER have figured it out on my own!
// https://www.reddit.com/r/adventofcode/comments/1hd7irq/2024_day_13_an_explanation_of_the_mathematics/
function pressButtons(buttonA: Vector, buttonB: Vector, prize: Vector): number {
  const a = Math.abs(
    (prize.x * buttonB.y - prize.y * buttonB.x) / (buttonA.x * buttonB.y - buttonA.y * buttonB.x),
  );
  const b = Math.abs(
    (prize.x * buttonA.y - prize.y * buttonA.x) / (buttonA.x * buttonB.y - buttonA.y * buttonB.x),
  );

  if (Math.floor(a) !== a || Math.floor(b) !== b) {
    return 0;
  }

  return (a * 3) + b;
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
