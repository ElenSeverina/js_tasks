/*
    Goal:
    Develop a function that works as indexOf but returns not first found index but all of them.
    It takes 2 params, current string and search string.

    Example:
    <your function name>('blue bird on blue sky', 'blue') -> [0, 13]
*/
function getAllIndexesOfSearchStr(currentStr: string | undefined, searchStr: string): number[] {
  const result: number[] = [];
  if (typeof currentStr !== 'string') {
    return result;
  }

  let index: number = currentStr.indexOf(searchStr);
  while (index !== -1) {
    result.push(index);
    index = currentStr.indexOf(searchStr, index + 1);
  }
  return result;
}

console.assert(JSON.stringify(getAllIndexesOfSearchStr(undefined, 'blue')) === '[]', 1);
console.assert(JSON.stringify(getAllIndexesOfSearchStr('string', 123 as unknown as string)) === '[]', 2);
console.assert(JSON.stringify(getAllIndexesOfSearchStr('blue bird on blue sky', 'blue')) === '[0,13]', 3);
console.assert(JSON.stringify(getAllIndexesOfSearchStr('12345', '8')) === '[]', 4);
console.assert(JSON.stringify(getAllIndexesOfSearchStr('abc it\'s an alpabet for a babies and adults', 'a')) === '[0,9,12,15,24,27,33,37]', 5);
console.assert(JSON.stringify(getAllIndexesOfSearchStr('string', 'Ring')) === '[]', 6);
console.assert(JSON.stringify(getAllIndexesOfSearchStr('sa rty ss uy sa', 's')) === '[0,7,8,13]', 7);

console.log('Finished testing');
