/*
    Goal:
    Develop an Iterator. It must have methods: next, reset and property count and current
    The iterator must take an options parameter to set options such as: step, start etc...
    Step can be: number | '+' | '*' | (current: number) => number.
    All methods of the iterator must be chained.

    Example:
    const iterator = new Iterator();

    iterator.next();
    iterator.reset();
    iterator.next().next();

    iterator.count;
    iterator.current;
*/

let iterator = new Iterator();
console.assert(iterator.count === 0, 1);
console.assert(iterator.current === 0, 2);

iterator.next();
console.assert(iterator.count === 1, 3);
console.assert(iterator.next().count === 2, 4);
console.assert(iterator.current === 2, 5);

iterator.reset();
console.assert(iterator.count === 0, 6);
console.assert(iterator.current === 0, 7);

iterator = new Iterator({
  step: 2,
  start: 1,
});
console.assert(iterator.count === 0, 8);
console.assert(iterator.current === 1, 9);

iterator.next();
console.assert(iterator.count === 1, 10);
console.assert(iterator.current === 3, 11);

iterator = new Iterator({
  step: '*',
  start: 3,
});
console.assert(iterator.count === 0, 12);
console.assert(iterator.current === 3, 13);

iterator.next();
console.assert(iterator.count === 1, 14);
console.assert(iterator.current === 9, 15);

iterator = new Iterator({
  step: '+',
  start: 0,
});
// your all other tests here
// ...

console.log('Tests finished');

const range = {
  from: 0,
  to: 5,
};

range[Symbol.iterator] = function () {
  let current = this.from;
  const last = this.to;

  return {
    next() {
      if (current <= last) {
        return {
          done: false,
          value: current++,
        };
      }
      return {
        done: true,
      };
    },
  };
};

for (let num of range) {
  console.log(num);
}
