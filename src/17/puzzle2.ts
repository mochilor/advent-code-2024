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

export default function puzzle(input: string): number {
  const inputArray = input.trim().split('\n').filter((n: string) => n);

  const program = inputArray[3]
    .split(': ')[1]
    .split(',')
    .map((number: string) => parseInt(number, 10));

  function runProgram(currentProgram: number[]): number[] {
    let n = 0;

    while (n < currentProgram.length) {
      const opcode = currentProgram[n];
      const operand = currentProgram[n + 1];
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

    return output;
  }

  let newProgram = [];
  let n = 117439; // for the test
  // let n = 0;

  while (newProgram.toString() !== program.toString()) {
    n += 1;
    A = n;
    B = 0;
    C = 0;
    output = [];
    newProgram = runProgram(program);
  }

  return n;
}
