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

function Iterator(step, start) {
  this.count = 0;
  this.current = start;

  if (typeof start === 'undefined') {
    this.current = 0;
  }

  this.next = function () {
    this.count = this.count += 1;
    this.current = start;

    if (typeof start === 'undefined') {
      this.current = this.count;
    }

    if (typeof step === 'number') {
      this.current = this.current += step;
    }

    if (step === '*') {
      this.current = this.current * this.current;
    }

    if (step === '+') {
      this.current = this.current + this.current;
    }

    if (step === '+' && start === 0) {
      this.current = this.current += this.count;
    }

    return {
      current: this.current,
      count: this.count,
    };
  };
  this.reset = function () {
    this.count = 0,
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

iterator.reset();
console.assert(iterator.count === 0, 6);
console.assert(iterator.current === 0, 7);

iterator = new Iterator(2, 1);
console.assert(iterator.count === 0, 8);
console.assert(iterator.current === 1, 9);

iterator.next();
console.assert(iterator.count === 1, 10);
console.assert(iterator.current === 3, 11);

iterator = new Iterator('*', 3);
console.assert(iterator.count === 0, 12);
console.assert(iterator.current === 3, 13);

iterator.next();
console.assert(iterator.count === 1, 14);
console.assert(iterator.current === 9, 15);

iterator = new Iterator('+', 0);
console.assert(iterator.count === 0, 12);
console.assert(iterator.current === 0, 13);

iterator.next();
console.assert(iterator.count === 1, 16);
console.assert(iterator.current === 1, 17);
