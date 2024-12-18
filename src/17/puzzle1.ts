let A = 0;
let B = 0;
let C = 0;
let output = [];

class Instruction {
  constructor(
    private opcode: number,
    private operand: number,
  ) {}

  private combo(): number {
    if (this.operand >= 0 && this.operand <= 3) {
      return this.operand;
    }
    if (this.operand === 4) {
      return A;
    }
    if (this.operand === 5) {
      return B;
    }
    if (this.operand === 6) {
      return C;
    }

    throw new Error('unexpected combo value');
  }

  private functions = [
    () => {
      A = Math.floor(A / 2 ** this.combo());
      return null;
    },
    () => {
      B ^= this.operand;
      return null;
    },
    () => {
      B = this.combo() % 8;
      return null;
    },
    () => {
      if (A === 0) {
        return null;
      }
      return this.operand;
    },
    () => {
      B ^= C;
      return null;
    },
    () => {
      output.push(this.combo() % 8);
      return null;
    },
    () => {
      B = Math.floor(A / 2 ** this.combo());
      return null;
    },
    () => {
      C = Math.floor(A / 2 ** this.combo());
      return null;
    },
  ];

  public run(): number {
    return this.getFunction()();
  }

  private getFunction(): () => number | null {
    return this.functions[this.opcode];
  }
}

export default function puzzle(input: string): string {
  const inputArray = input.trim().split('\n').filter((n: string) => n);

  A = parseInt(inputArray[0].split(': ')[1], 10);
  B = parseInt(inputArray[1].split(': ')[1], 10);
  C = parseInt(inputArray[2].split(': ')[1], 10);

  const program = inputArray[3]
    .split(': ')[1]
    .split(',')
    .map((number: string) => parseInt(number, 10));

  let n = 0;

  while (n < program.length) {
    const opcode = program[n];
    const operand = program[n + 1];
    if (operand === undefined) {
      break;
    }

    const instruction = new Instruction(opcode, operand);
    const result = instruction.run();
    if (result !== null) {
      n = result;
    } else {
      n += 2;
    }
  }

  return output.join(',');
}
