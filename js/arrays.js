// 0. Given two Arrays [1,2,3,4], [5,6,7,8]
// Insert second Array to the begining of the first
// [1,2,3,4], [5,6,7,8] -> [5,6,7,8,1,2,3,4]

const array01 = [1, 2, 3, 4];
const array02 = [5, 6, 7, 8];
const newArray = array02.concat(array01);
console.log(newArray);

// 1. Given Arrays [1,2,3,4,5,6]. Insert value 11 in the middle of the array.

let array1 = [1, 2, 3, 4, 5, 6];
array1.splice(3, 0, 11);
console.log(array1);

// 2. Given an Array [1,2,undefined,0,NaN,true,BigInt(10),null,-9,Infinity,{},"-1",""].
//   filter this Array in 2 different ways, to has:
//   - only numbers inside
//   - only objects inside

const array2 = [1, 2, undefined, 0, NaN, true, BigInt(10), null, -9, Infinity, {}, "-1", ""];
const newArray02 = array2.filter(
  (item) =>
    (typeof item === "number" && Number.isFinite(item)) ||
    typeof item === "bigint"
);
const newArray2 = array2.filter(
  (item) => typeof item === "object" && item !== null
);
console.log(newArray02);
console.log(newArray2);

// 3. Given an Array [1,100,201,34,-12,0,3.12]. Return the Sum of its items

const array3 = [1, 100, 201, 34, -12, 0, 3.12];
const newArray3 = array3.reduce((sum, current) => sum + current, 0);
console.log(newArray3);

// 4. Given an Array [-3,4,9,123].
//   Return new Array that has incremented every item by 1:
//   [-3,4,9,123] -> [-2,5,10,124]

const array4 = [-3, 4, 9, 123];
const newArray4 = array4.map((item) => item + 1);
console.log(newArray4);

// 5. Create an Array of 1000 items and fill it with Random Unique Integer values

function generateArrayOfRandomNums() {
  const randomUnics = [];
  while (randomUnics.length < 1000) {
    const randomInt = Math.floor(Math.random() * 1000) + 1;
    if (!randomUnics.includes(randomInt)) {
      randomUnics.push(randomInt);
    }
  }
  return randomUnics;
}
console.log(generateArrayOfRandomNums());

//6. Given an Array for example: [2,3,4,7,8,10].
// Return the Array of gaps:
// [2,3,4,7,8,10] -> [5,6,9]
// [-2,3,4] -> [-1,0,1,2]

const array6 = [2, 3, 4, 7, 8, 10];

function findGaps(array) {
  const sortedArray = array.sort((a, b) => a - b);
  let result = [];

  for (let i = sortedArray[0]; i <= sortedArray.slice(-1); i++) {
    if (!array.includes(i)) {
      result.push(i);
    }
  }
  return result;
}

console.log(findGaps(array6));

// 7. Deduplicate given Array [1,4,3,-1,-3,5,1,9,-1,3,100,4]
// Result: [1,4,3,-1,-3,5,9,100]

const array7 = [1, 4, 3, -1, -3, 5, 1, 9, -1, 3, 100, 4];

//7.1
function getUnicArray(array) {
  let result = [];

  array.forEach(function (item) {
    if (result.indexOf(item) === -1) {
      result.push(item);
    }
  });
  return result;
}

console.log(getUnicArray(array7));

//7.2
const unicArray = Array.from(new Set(array7));
console.log(unicArray);

// 8. Merge two Arrays into one using 3 different variants:
//   - just merge: [-100,1,2,3,4,5,7,8,9] + [1,3,-1,4,-10,7,6] -> [-100,1,2,3,4,5,7,8,9,1,3,-1,4,-10,7,6]
//   - with deduplication [-100,1,2,3,4,5,7,8,9] + [1,3,-1,4,-10,7,6] -> [-100,1,2,3,4,5,7,8,9,-1,-10,6]
//   - with sorting [-100,1,2,3,4,5,7,8,9] + [1,3,-1,4,-10,7,6] -> [-100,-10,-1,1,2,3,4,5,6,7,8,9]

const array08 = [-100, 1, 2, 3, 4, 5, 7, 8, 9];
const array8 = [1, 3, -1, 4, -10, 7, 6];
const newArray8 = array08.concat(array8);
const unicNewArray8 = Array.from(new Set(array08.concat(array8)));
const sortedNewArray8 = newArray8.sort((a, b) => a - b);
console.log(sortedNewArray8);

// 9. Given a String "hello Young developer".
// Return an array of words ['hello','Young','developer'].

const string9 = "hello Young developer";
const arrayFromString = string9.split(" ");
console.log(arrayFromString);

// 10. Given a String "  hello  Young  young developer ".
// Return an array of unique words ['hello','Young','developer'].

const string10 = "  hello  Young  young developer ";

function filteredWords(str) {
  const words = str.split(" ");
  const uniqueWords = [];

  words.forEach((word) => {
    if (
      !uniqueWords.some(
        (uniqueWord) => uniqueWord.toLowerCase() === word.toLowerCase()
      ) &&
      word !== ""
    ) {
      uniqueWords.push(word);
    }
  });
  return uniqueWords;
}

console.log(filteredWords(string10));

// 11. Given a String in camel case "someFunctionName".
// Return string in kebab case: "someFunctionName" -> "some-function-name"

const strCamelCase = "someFunctionName";
const strKebabCase = strCamelCase
  .split(/(?=[A-Z])/)
  .join("-")
  .toLowerCase();
console.log(strKebabCase);

// 12. Given an Array [9,[2,5],[3,[4,[6,[7]],8,[1]]]]
// Return flat Array of Numbers, don't use .flat() method:
// [9,[2,5],[3,[4,[6,[7]],8,[1]]]] -> [9,2,5,3,4,6,7,8,1]

const arrayOfArrays = [9, [2, 5], [3, [4, [6, [7]], 8, [1]]]];

function getFlatArray(arr) {
  return arr.reduce((accumulator, current) => {
    return accumulator.concat(
      Array.isArray(current) ? getFlatArray(current) : current
    );
  }, []);
}

console.log(getFlatArray(arrayOfArrays));

// 13. Given an Array
//     const arr1 = [3,{a:1},[2],null,NaN,Infinity,undefined];
//     Create function deepCopy for copy arr1 into arr2:
//     const arr2 = deepCopy(arr1);
//     arr2[1].a = 2;
//     arr2[2][0] = 3;

//     arr2[1].a // 2
//     arr2[2][0] // 3

//     arr1[1].a // 1
//     arr1[2][0] // 2

const array13 = [3, { a: 1 }, [2], null, NaN, Infinity, undefined];

function deepCopy(item) {
  if (typeof item !== "object" || item === null) {
    return item;
  }

  return Array.isArray(item)
    ? item.map(deepCopy)
    : Object.fromEntries(
        Object.entries(item).map(([key, value]) => [key, deepCopy(value)])
      );
}

const deepCopyArray = deepCopy(array13);
console.log(deepCopyArray);

//! чи можна використовувати?
const array13Copy = structuredClone(array13);

// 14. Given Arrays [0,1,2,3,4,5] and [6,8,1,-1,8,3]
//   Return new Array that contains items that present in both arrays:
//   [0,8,1,2,3,4,5], [6,8,1,-1,8,3] -> [1,3,8]

const array14 = [0, 8, 1, 2, 3, 4, 5];
const array014 = [6, 8, 1, -1, 8, 3];

function getCommonElements(arr1, arr2) {
  const result = [];
  for (const num of arr1) {
    if (arr2.includes(num) && !result.includes(num)) {
      result.push(num);
    }
  }
  return result.sort((a, b) => a - b);
}

console.log(getCommonElements(array14, array014));

// 15. Given an Array [0,4,6,7,8,1,3,6,7,9,1,2,4,5,1]
//   Return index of last number 4 -> 12

const array15 = [0, 4, 6, 7, 8, 1, 3, 6, 7, 9, 1, 2, 4, 5, 1];

function getLastIndex(arr, target) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

console.log(getLastIndex(array15, 4));

// 17. Given an Array [0,4,6,7,8,1,3,6,7,9,1,2,4,5,1]
// Return new Array with items from givern Array starts from index 4 and has 5 items
// [0,4,6,7,8,1,3,6,7,9,1,2,4,5,1] -> [8,1,3,6,7]

const array17 = [0, 4, 6, 7, 8, 1, 3, 6, 7, 9, 1, 2, 4, 5, 1];
const newArray17 = array17.splice(4, 5);
console.log(newArray17);

// 18. Given an Array [0,0,0,1,1,1,0,0,0]
//  Use method .splice() to get two arrays like:
//  [0,0,0,0,0,0] and [1,1,1]

const array18 = [0, 0, 0, 1, 1, 1, 0, 0, 0];

const sortedArray = array18.sort((a, b) => a - b);
const arrayOfZero = sortedArray.slice(0, sortedArray.lastIndexOf(0) + 1);
const arrayOfOne = sortedArray.slice(sortedArray.lastIndexOf(0) + 1);

console.log(arrayOfZero);
console.log(arrayOfOne);
