// 0. Given two Arrays [1,2,3,4], [5,6,7,8]
// Insert second Array to the begining of the first
// [1,2,3,4], [5,6,7,8] -> [5,6,7,8,1,2,3,4]

console.log(0, [5, 6, 7, 8, ...[1, 2, 3, 4]]);

// 1. Given Arrays [1,2,3,4,5,6]. Insert value 11 in the middle of the array.

const arr1 = [1, 2, 3, 4, 5, 6];
console.log(1, arr1.toSpliced(Math.round(arr1.length / 2), 0, 11));

// 2. Given an Array [1,2,undefined,0,NaN,true,BigInt(10),null,-9,Infinity,{},"-1",""].
//   filter this Array in 2 different ways, to has:
//   - only numbers inside
//   - only objects inside

const filteredArray1 = [1, 2, undefined, 0, NaN, true, BigInt(10), null, -9, Infinity, {}, "-1", "",]
  .filter((item) =>
    (typeof item === "number" && Number.isFinite(item)) ||
    typeof item === "bigint");

const filteredArray2 = [1, 2, undefined, 0, NaN, true, BigInt(10), null, -9, Infinity, {}, "-1", "",]
  .filter((item) => typeof item === "object" && item !== null);

console.log(2.1, filteredArray1);
console.log(2.2, filteredArray2);

// 3. Given an Array [1,100,201,34,-12,0,3.12]. Return the Sum of its items

const array3 = [1, 100, 201, 34, -12, 0, 3.12]
  .reduce((sum, current) => sum + current, 0);
console.log(3, array3);

// 4. Given an Array [-3,4,9,123].
//   Return new Array that has incremented every item by 1:
//   [-3,4,9,123] -> [-2,5,10,124]

const array4 = [-3, 4, 9, 123].map((item) => item + 1);
console.log(4, array4);

// 5. Create an Array of 1000 items and fill it with Random Unique Integer values

new Array(1000)
  .fill("")
  .map((v, i) => Number(String(Math.floor(Math.random() * 1000) + 1) + i));

[...new Array(1000)].map((v, i) =>
  Number(String(Math.floor(Math.random() * 1000) + 1) + i)
);

const arr5 = new Array(1000);
for (let i = 0; i < 1000; i++) {
  arr5[i] = String(Math.floor(Math.random() * 1000) + 1) + i;
}
console.log(5, arr5);

//6. Given an Array for example: [2,3,4,7,8,10].
// Return the Array of gaps:
// [2,3,4,7,8,10] -> [5,6,9]
// [-2,3,4] -> [-1,0,1,2]

console.log(
  6, [2, 3, 4, 7, 8, 10].reduce((res, currentNumber, index, arr) => {
    const previousNumber = arr[index - 1];
    if (index > 0 && currentNumber - 1 !== previousNumber) {
      for (
        let gapNumber = previousNumber + 1;
        gapNumber < currentNumber;
        gapNumber++
      ) {
        res.push(gapNumber);
      }
    }
    return res;
  }, [])
);

// 7. Deduplicate given Array [1,4,3,-1,-3,5,1,9,-1,3,100,4]
// Result: [1,4,3,-1,-3,5,9,100]

const unicArray2 = [...new Set([1, 4, 3, -1, -3, 5, 1, 9, -1, 3, 100, 4])];
console.log(7, unicArray2);

// 8. Merge two Arrays into one using 3 different variants:
//   - just merge: [-100,1,2,3,4,5,7,8,9] + [1,3,-1,4,-10,7,6] -> [-100,1,2,3,4,5,7,8,9,1,3,-1,4,-10,7,6]
//   - with deduplication [-100,1,2,3,4,5,7,8,9] + [1,3,-1,4,-10,7,6] -> [-100,1,2,3,4,5,7,8,9,-1,-10,6]
//   - with sorting [-100,1,2,3,4,5,7,8,9] + [1,3,-1,4,-10,7,6] -> [-100,-10,-1,1,2,3,4,5,6,7,8,9]

const array8 = [-100, 1, 2, 3, 4, 5, 7, 8, 9].concat([1, 3, -1, 4, -10, 7, 6]);

const unicArray8 = Array.from(
  new Set([-100, 1, 2, 3, 4, 5, 7, 8, 9].concat([1, 3, -1, 4, -10, 7, 6]))
);

const sortedUnicArray8 = Array.from(
  new Set(
    [-100, 1, 2, 3, 4, 5, 7, 8, 9]
      .concat([1, 3, -1, 4, -10, 7, 6])
      .sort((a, b) => a - b)
  )
);

console.log(8.1, array8);
console.log(8.2, unicArray8);
console.log(8.3, sortedUnicArray8);

// 9. Given a String "hello Young developer".
// Return an array of words ['hello','Young','developer'].

const arrayFromString = "hello Young developer".split(" ");
console.log(9, arrayFromString);

// 10. Given a String "  hello  Young  young developer ".
// Return an array of unique words ['hello','Young','developer'].

function filteredWords(str) {
  const uniqueWords = [];

  str.split(" ").forEach((word) => {
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

console.log(10, filteredWords("  hello  Young  young developer "));

// 11. Given a String in camel case "someFunctionName".
// Return string in kebab case: "someFunctionName" -> "some-function-name"

function strKebabCase(str) {
  return str
    .split("")
    .map((char, index) => {
      if (index !== 0 && char === char.toUpperCase()) {
        return "-" + char.toLowerCase();
      }
      return char.toLowerCase();
    })
    .join("");
}
console.log(11, strKebabCase("someFunctionName"));

// 12. Given an Array [9,[2,5],[3,[4,[6,[7]],8,[1]]]]
// Return flat Array of Numbers, don't use .flat() method:
// [9,[2,5],[3,[4,[6,[7]],8,[1]]]] -> [9,2,5,3,4,6,7,8,1]

console.log(12, [9, [2, 5], [3, [4, [6, [7]], 8, [1]]]].toString().split(","));

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

const arr131 = [3, { a: 1 }, [2], null, NaN, Infinity, undefined];
const arr132 = getDeepCopy(arr131);
arr132[1].a = 2;
arr132[2][0] = 3;

console.log(
  13,
  arr132[1].a === 2,
  arr132[2][0] === 3,
  arr131[1].a === 1,
  arr131[2][0] === 2
);

const arr133 = [3, { a: 1 }, [2], null, NaN, Infinity, undefined];
const arr134 = structuredClone(arr131);
arr134[1].a = 2;
arr134[2][0] = 3;

console.log(
  13,
  arr134[1].a === 2,
  arr134[2][0] === 3,
  arr133[1].a === 1,
  arr133[2][0] === 2
);

const arrayDeepCopy = structuredClone(13, [3, { a: 1 }, [2], null, NaN, Infinity, undefined,]);

// 14. Given Arrays [0,1,2,3,4,5] and [6,8,1,-1,8,3]
//   Return new Array that contains items that present in both arrays:
//   [0,8,1,2,3,4,5], [6,8,1,-1,8,3] -> [1,3,8]

function getCommonElements(arr1, arr2) {
  return arr1.filter((num) => arr2.includes(num)).sort((a, b) => a - b);
}

console.log(14, getCommonElements([0, 8, 1, 2, 3, 4, 5], [6, 8, 1, -1, 8, 3]));

// 15. Given an Array [0,4,6,7,8,1,3,6,7,9,1,2,4,5,1]
//   Return index of last number 4 -> 12

console.log(15, [0, 4, 6, 7, 8, 1, 3, 6, 7, 9, 1, 2, 4, 5, 1].lastIndexOf(4));

// 16. Given an Array [0,4,6,7,8,1,3,6,7,9,1,2,4,5,1]
// Return new Array with items from givern Array starts from index 4 and has 5 items
// [0,4,6,7,8,1,3,6,7,9,1,2,4,5,1] -> [8,1,3,6,7]

console.log(16, [0, 4, 6, 7, 8, 1, 3, 6, 7, 9, 1, 2, 4, 5, 1].slice(4, 4 + 5));

// 17. Given an Array [0,0,0,1,1,1,0,0,0]
//  Use method .splice() to get two arrays like:
//  [0,0,0,0,0,0] and [1,1,1]

const arr171 = [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0];
const startIndex = arr171.findIndex((v) => v === 1);
const endIndex = arr171.lastIndexOf(1);
const arr172 = arr171.splice(startIndex, endIndex - startIndex + 1);

const [arr173, arr174] = [
  0, 0, 2, 3, 4, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,
].reduce((res, number) => {
  if (!res[number]) {
    res[number] = [];
  }
  res[number].push(number);
  return res;
}, []);

console.log(17, arr173, arr174);
