export default function puzzle(input: string): number {
  // The idea is to build four lists of strings: rows, columns and two diagonals
  // Then is just a matter of looking for matches
  const rows = input.split('\n');
  const columns = [];
  const diagonals: string[][] = [];

  rows.forEach((row: string) => {
    row.split('').forEach((letter: string, columnNumber: number) => {
      if (columns[columnNumber] === undefined) {
        columns[columnNumber] = '';
      }
      columns[columnNumber] += letter;
    });
  });

  const rowsReverse = [...rows].reverse();
  const columnsReverse = columns.map((column: string) => column.split('').reverse().join(''));

  [rows, rowsReverse].forEach((rowArray: string[], key: number) => {
    diagonals[key] = [];
    rowArray.forEach((row: string, rowNumber: number) => {
      let currentLetterPosition = 0;
      diagonals[key][rowNumber] = row.substring(currentLetterPosition, currentLetterPosition + 1);
      let nextRow = rowNumber - 1;
      while (rowArray[nextRow] !== undefined) {
        currentLetterPosition += 1;
        diagonals[key][rowNumber] += rowArray[nextRow]
          .substring(currentLetterPosition, currentLetterPosition + 1);
        nextRow -= 1;
      }
    });
  });

  [columns, columnsReverse].forEach((columnArray: string[], key: number) => {
    columnArray.forEach((column: string, columnNumber: number) => {
      if (columnNumber === 0) {
        return;
      }

      let currentLetterPosition = column.length - 1;
      diagonals[key][rows.length + columnNumber - 1] = column.substring(currentLetterPosition);
      let nextColumn = columnNumber + 1;
      while (columnArray[nextColumn] !== undefined) {
        currentLetterPosition -= 1;
        diagonals[key][rows.length + columnNumber - 1] += columnArray[nextColumn]
          .substring(currentLetterPosition, currentLetterPosition + 1);
        nextColumn += 1;
      }
    });
  });

  let result = 0;

  [rows, columns, diagonals[0], diagonals[1]].forEach((list: string[]) => {
    list.forEach((letters: string) => {
      result += (letters.match(/XMAS/g) || []).length;
      result += (letters.match(/SAMX/g) || []).length;
    });
  });

  return result;
}
