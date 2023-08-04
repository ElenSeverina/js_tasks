// 0. Given two Arrays [1,2,3,4], [5,6,7,8]
// Insert second Array to the begining of the first
// [1,2,3,4], [5,6,7,8] -> [5,6,7,8,1,2,3,4]

const array = [5, 6, 7, 8].concat([1, 2, 3, 4]);
console.log(array);

// 1. Given Arrays [1,2,3,4,5,6]. Insert value 11 in the middle of the array.

let array1 = [1, 2, 3, 4, 5, 6];
array1.splice(3, 0, 11);
console.log(array1);

// 2. Given an Array [1,2,undefined,0,NaN,true,BigInt(10),null,-9,Infinity,{},"-1",""].
//   filter this Array in 2 different ways, to has:
//   - only numbers inside
//   - only objects inside

const filteredArray1 = [1, 2, undefined, 0, NaN, true, BigInt(10), null, -9, Infinity, {}, "-1", ""].filter(
  (item) =>
    (typeof item === "number" && Number.isFinite(item)) ||
    typeof item === "bigint"
);
const filteredArray2 = [1, 2, undefined, 0, NaN, true, BigInt(10), null, -9, Infinity, {}, "-1", ""].filter(
  (item) => typeof item === "object" && item !== null
);
console.log(filteredArray1);
console.log(filteredArray2);

// 3. Given an Array [1,100,201,34,-12,0,3.12]. Return the Sum of its items

const array3 = [1, 100, 201, 34, -12, 0, 3.12].reduce((sum, current) => sum + current, 0);
console.log(array3);

// 4. Given an Array [-3,4,9,123].
//   Return new Array that has incremented every item by 1:
//   [-3,4,9,123] -> [-2,5,10,124]

const array4 = [-3, 4, 9, 123].map((item) => item + 1);
console.log(array4);

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

console.log(findGaps([2, 3, 4, 7, 8, 10]));

// 7. Deduplicate given Array [1,4,3,-1,-3,5,1,9,-1,3,100,4]
// Result: [1,4,3,-1,-3,5,9,100]

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

console.log(getUnicArray([1, 4, 3, -1, -3, 5, 1, 9, -1, 3, 100, 4]));

//7.2
const unicArray = Array.from(new Set([1, 4, 3, -1, -3, 5, 1, 9, -1, 3, 100, 4]));
console.log(unicArray);

// 8. Merge two Arrays into one using 3 different variants:
//   - just merge: [-100,1,2,3,4,5,7,8,9] + [1,3,-1,4,-10,7,6] -> [-100,1,2,3,4,5,7,8,9,1,3,-1,4,-10,7,6]
//   - with deduplication [-100,1,2,3,4,5,7,8,9] + [1,3,-1,4,-10,7,6] -> [-100,1,2,3,4,5,7,8,9,-1,-10,6]
//   - with sorting [-100,1,2,3,4,5,7,8,9] + [1,3,-1,4,-10,7,6] -> [-100,-10,-1,1,2,3,4,5,6,7,8,9]

const array8 = [-100, 1, 2, 3, 4, 5, 7, 8, 9].concat([
  1, 3, -1, 4, -10, 7, 6,
]);
const unicArray8 = Array.from(
  new Set([-100, 1, 2, 3, 4, 5, 7, 8, 9].concat([1, 3, -1, 4, -10, 7, 6]))
);
const sortedArray8 = [-100, 1, 2, 3, 4, 5, 7, 8, 9]
  .concat([1, 3, -1, 4, -10, 7, 6])
  .sort((a, b) => a - b);

console.log(array8);
console.log(unicArray8);
console.log(sortedArray8);

// 9. Given a String "hello Young developer".
// Return an array of words ['hello','Young','developer'].

const arrayFromString = "hello Young developer".split(" ");
console.log(arrayFromString);

// 10. Given a String "  hello  Young  young developer ".
// Return an array of unique words ['hello','Young','developer'].

function filteredWords(str) {
  const uniqueWords = [];

  str.split(" ").forEach((word) => {
    if (!uniqueWords.some(
        (uniqueWord) => uniqueWord.toLowerCase() === word.toLowerCase()
      ) && word !== ""
    ) {
      uniqueWords.push(word);
    }
  });
  return uniqueWords;
}

console.log(filteredWords("  hello  Young  young developer "));

// 11. Given a String in camel case "someFunctionName".
// Return string in kebab case: "someFunctionName" -> "some-function-name"

const strKebabCase = "someFunctionName"
  .split(/(?=[A-Z])/)
  .join("-")
  .toLowerCase();
console.log(strKebabCase);

// 12. Given an Array [9,[2,5],[3,[4,[6,[7]],8,[1]]]]
// Return flat Array of Numbers, don't use .flat() method:
// [9,[2,5],[3,[4,[6,[7]],8,[1]]]] -> [9,2,5,3,4,6,7,8,1]

function getFlatArray(arr) {
  return arr.reduce((accumulator, current) => {
    return accumulator.concat(
      Array.isArray(current) ? getFlatArray(current) : current
    );
  }, []);
}

console.log(getFlatArray([9, [2, 5], [3, [4, [6, [7]], 8, [1]]]]));

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

function getDeepCopy(item) {
  if (typeof item !== "object" || item === null) {
    return item;
  }

  return Array.isArray(item)
    ? item.map(getDeepCopy)
    : Object.fromEntries(
        Object.entries(item).map(([key, value]) => [key, getDeepCopy(value)])
      );
}

console.log(getDeepCopy([3, { a: 1 }, [2], null, NaN, Infinity, undefined]));

//! чи можна використовувати?
const arrayDeepCopy = structuredClone([3, { a: 1 }, [2], null, NaN, Infinity, undefined]);

// 14. Given Arrays [0,1,2,3,4,5] and [6,8,1,-1,8,3]
//   Return new Array that contains items that present in both arrays:
//   [0,8,1,2,3,4,5], [6,8,1,-1,8,3] -> [1,3,8]

function getCommonElements(arr1, arr2) {
  const result = [];
  for (const num of arr1) {
    if (arr2.includes(num) && !result.includes(num)) {
      result.push(num);
    }
  }
  return result.sort((a, b) => a - b);
}

console.log(getCommonElements([0, 8, 1, 2, 3, 4, 5], [6, 8, 1, -1, 8, 3]));

// 15. Given an Array [0,4,6,7,8,1,3,6,7,9,1,2,4,5,1]
//   Return index of last number 4 -> 12

function getLastIndex(arr, target) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}

console.log(getLastIndex([0, 4, 6, 7, 8, 1, 3, 6, 7, 9, 1, 2, 4, 5, 1], 4));

// 17. Given an Array [0,4,6,7,8,1,3,6,7,9,1,2,4,5,1]
// Return new Array with items from givern Array starts from index 4 and has 5 items
// [0,4,6,7,8,1,3,6,7,9,1,2,4,5,1] -> [8,1,3,6,7]

const array17 = [0, 4, 6, 7, 8, 1, 3, 6, 7, 9, 1, 2, 4, 5, 1].splice(4, 5);
console.log(array17);

// 18. Given an Array [0,0,0,1,1,1,0,0,0]
//  Use method .splice() to get two arrays like:
//  [0,0,0,0,0,0] and [1,1,1]

const sortedArray = [0, 0, 0, 1, 1, 1, 0, 0, 0].sort((a, b) => a - b);
const arrayOfZero = sortedArray.slice(0, sortedArray.lastIndexOf(0) + 1);
const arrayOfOne = sortedArray.slice(sortedArray.lastIndexOf(0) + 1);

console.log(arrayOfZero);
console.log(arrayOfOne);
