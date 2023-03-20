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

function Iterator(options = {}) {
  this.count = 0;

  let { start = 0, step = 1 } = options;

  this.current = start;
  this.step = step;

  if (typeof start !== "number" || isNaN(start)) {
    this.current = 0;
  }

  this.next = () => {
    let newStep = this.step;

    if (typeof this.step === "function") {
      newStep = this.step(this.current);
    }

    if (typeof this.step === "number") {
      newStep = this.current += this.step;
    }

    if (this.step === "*") {
      newStep = this.current * this.current;
    }

    if (this.step === "+") {
      newStep = this.current += 1;
    }

    if (this.step === "+" && this.start > 0) {
      newStep = this.current += this.current;
    }

    this.current = newStep;
    this.count++;
    return this;
  };

  this.reset = () => {
    this.count = 0;
    this.current = 0;
    return this;
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
  step: "*",
  start: 3,
});
console.assert(iterator.count === 0, 12);
console.assert(iterator.current === 3, 13);

iterator.next();
console.assert(iterator.count === 1, 14);
console.assert(iterator.current === 9, 15);

iterator = new Iterator({
  step: "+",
  start: 0,
});
console.assert(iterator.count === 0, 16);
console.assert(iterator.current === 0, 17);

iterator.next();
console.assert(iterator.count === 1, 18);
console.assert(iterator.current === 1, 19);

iterator = new Iterator({
  step: (current) => current + 66,
  start: 0,
});
iterator.next();
console.assert(iterator.current === 66, 20);

iterator = new Iterator({
  step: 1,
  start: 0,
});
console.assert(iterator.next().next().next().next().current === 4, 21);

iterator = new Iterator({
  step: 2,
  start: "two",
});
console.assert(iterator.count === 0, 22);
console.assert(iterator.current === 0, 23);

iterator.next();
console.assert(iterator.count === 1, 24);
console.assert(iterator.current === 2, 25);

iterator = new Iterator({
  step: 1,
  start: NaN,
});
console.assert(iterator.count === 0, 26);
console.assert(iterator.current === 0, 27);

iterator.next();
console.assert(iterator.count === 1, 28);
console.assert(iterator.current === 1, 29);

iterator = new Iterator({
  step: 2,
  start: 0,
});
console.assert(iterator.next().next().reset().next().current === 2, 30);

console.log("Tests finished");
