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

function Iterator(options) {
  this.count = 0;
  this.current = options ? options.start : 0;
  this.step = options ? options.step : 1;

  this.next = () => {
    if (typeof this.step === 'function') {
      this.current = this.step(this.current);
    } else if (this.step === '*') {
      this.current *= this.current;
    } else if (this.step === '+') {
      this.current += 1;
    } else {
      this.current += this.step;
    }
    this.count++;
    return this;
  };

  this.reset = () => {
    this.count = 0;
    this.current = 0;
  };
}

let iterator = new Iterator();

console.assert(iterator.count === 0, 1);
console.assert(iterator.current === 0, 2);

iterator.next();
console.assert(iterator.count === 1, 3);
console.assert(iterator.next().count === 2, 4);
console.assert(iterator.current === 2, 5);

iterator = new Iterator({
  step: (current) => current + 66,
  start: 0,
});
iterator.next();
console.assert(iterator.current === 66, 16);

iterator = new Iterator({
  step: 1,
  start: 0,
});
console.assert(iterator.next().next().next().next().current === 4);

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
console.assert(iterator.count === 0, 16);
console.assert(iterator.current === 0, 17);

iterator.next();
console.assert(iterator.count === 1, 18);
console.assert(iterator.current === 1, 19);

console.log('Tests finished');
