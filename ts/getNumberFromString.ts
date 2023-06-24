function getNumberFromString(str: unknown): number | null {
  if (typeof str === 'number') {
    return str;
  }

  if (typeof str !== 'string') {
    return null;
  }

  const arrOfSymbols: string[] = str.split('');
  const arrOfStrings: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const alreadyHasADot = false;
  let isPreviousSymbolADot = false;
  const result: (string|number)[] = [];

  for (let i:number = 0; i < arrOfSymbols.length; i++) {
    const symbol: string = arrOfSymbols[i];

    if (symbol === '.' && alreadyHasADot) {
      continue;
    }

    if (symbol === '.') {
      isPreviousSymbolADot = true;
      continue;
    }

    if (!arrOfStrings.includes(symbol)) {
      isPreviousSymbolADot = false;
      continue;
    }

    if (isPreviousSymbolADot) {
      result.push('.');
    }

    result.push(symbol);
    isPreviousSymbolADot = false;
  }

  if (result.length === 0) {
    return null;
  }

  return parseFloat(result.join(''));
}

console.assert(getNumberFromString('123') === 123, 1);
console.assert(getNumberFromString('1234567890') === 1234567890, 2);

console.log('test complited');