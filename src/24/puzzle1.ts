/* eslint-disable no-bitwise */
type Wire = {
  name: string,
  value: 1 | 0,
};

type Gate = {
  input1: Wire,
  input2: Wire,
  type: 'AND' | 'OR' | 'XOR',
  output: Wire,
};

function parseGate(gateData: string, input1: Wire, input2: Wire): Gate {
  const data = gateData.replace('-> ', '').split(' ');
  const type = data[1] as 'AND' | 'OR' | 'XOR';
  const output = {
    name: data[3],
    value: 0 as 1 | 0,
  };

  return {
    input1,
    input2,
    type,
    output,
  };
}

function runGate(gate: Gate): Wire {
  let value = 0;
  if (gate.type === 'AND') {
    value = gate.input1.value & gate.input2.value;
  }
  if (gate.type === 'OR') {
    value = gate.input1.value | gate.input2.value;
  }
  if (gate.type === 'XOR') {
    value = gate.input1.value ^ gate.input2.value;
  }

  const { output } = gate;

  output.value = value as 0 | 1;

  return output;
}

export default function puzzle(input: string): number {
  const data = input.trim().split('\n\n');

  const wires: Wire[] = data[0].split('\n').map((row: string) => {
    const values = row.split(': ');
    return {
      name: values[0],
      value: parseInt(values[1], 2) as 1 | 0,
    };
  });

  function getWire(name: string): Wire | null {
    for (let n = 0; n < wires.length; n += 1) {
      if (wires[n].name === name) {
        return wires[n];
      }
    }

    return null;
  }

  const gatesData = data[1].split('\n');

  while (gatesData.length) {
    gatesData.forEach((row: string, index: number) => {
      const gateData = row.split(' ');
      const input1 = getWire(gateData[0]);
      const input2 = getWire(gateData[2]);
      if (input1 && input2) {
        const gate = parseGate(row, input1, input2);
        wires.push(runGate(gate));
        gatesData.splice(index, 1);
      }
    });
  }

  let binaryResult = '';

  wires.filter((wire: Wire) => wire.name.indexOf('z') === 0)
    .sort((wireA: Wire, wireB: Wire) => wireB.name.localeCompare(wireA.name))
    .forEach((wire: Wire) => {
      binaryResult += wire.value.toString();
    });

  return parseInt(binaryResult, 2);
}
