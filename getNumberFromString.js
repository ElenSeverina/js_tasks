/*
*   Goal:
*   Develop a function that returns a number from passed string
*
*   Example:
*   getNumberFromString('s4s 56 s1!@4') -> 45614
*
*/

function getNumberFromString(str) {
  if (typeof str === 'number') {
    return str;
  }

  if (typeof str !== 'string') {
    return null;
  }

  const arrOfSymbols = str.split('');
  const arrOfStrings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let alreadyHasADot = false;
  let isPreviousSymbolADot = false;
  const result = [];

  for (let i = 0; i < arrOfSymbols.length; i++) {
    const symbol = arrOfSymbols[i];

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

  return parseFloat(result.join(''));
}

console.assert(getNumberFromString('123') === 123, 1);
console.assert(getNumberFromString('1234567890') === 1234567890, 2);
console.assert(getNumberFromString('s4s56s') === 456, 3);
console.assert(getNumberFromString('s4s 56 s1!@4') === 45614, 4);
console.assert(getNumberFromString('4.5') === 4.5, 5);
console.assert(getNumberFromString('.5') === 0.5, 6);
console.assert(getNumberFromString('5.asd') === 5, 7);
console.assert(getNumberFromString('as3dd.sda4sd2sad') === 342, 8);
console.assert(getNumberFromString('as3ddsda.4sd2sad') === 3.42, 9);
console.assert(getNumberFromString(123) === 123, 10);
console.assert(getNumberFromString(false) === null, 11);

console.log('test complited');