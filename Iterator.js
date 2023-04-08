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

  this.next = () => {
    let newStep = this.step;
    this.count++;

    if (typeof this.step === "function") {
      newStep = this.step(this.current);
    }

    if (typeof this.step === "number") {
      newStep = this.current + this.step;
    }

    if (this.step === 0) {
      newStep = this.current += 1;
    }

    if (this.step === '+') {
      newStep = this.current + this.current || 1;
    }

    if (this.step === '*') {
      newStep = this.current * this.current || 2;
    }

    if (this.step === '-') {
      newStep = this.current - this.start;
    }

    if (this.step === '/') {
      newStep = this.current / 2;
    }

    this.current = newStep;
    return this;
  };

  this.reset = () => {
    this.count = 0;
    let { start = 0, step = 1 } = options;
    this.start = start;
    this.current = start;
    this.step = step;

    if (
      (step !== "+" 
        && step !== "-" 
        && step !== "*" 
        && step !== "/" 
        && typeof step !== "number" 
        && typeof step !== "function"
      ) ||
      step === Infinity
    ) {
      this.step = 1;
    }

    if (typeof start !== "number" || Number.isNaN(start) || start === Infinity) {
      this.current = 0;
    }
    return this;
  };

  this.reset();
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

iterator.next().next();
console.assert(iterator.count === 3, 20);
console.assert(iterator.current === 4, 21);

iterator = new Iterator({
  step: (current) => current + 66,
  start: 0,
});
iterator.next();
console.assert(iterator.current === 66, 22);

iterator = new Iterator({
  step: 2,
  start: "two",
});
console.assert(iterator.count === 0, 23);
console.assert(iterator.current === 0, 24);

iterator.next();
console.assert(iterator.count === 1, 25);
console.assert(iterator.current === 2, 26);

iterator = new Iterator({
  step: {},
  start: {},
});
console.assert(iterator.count === 0, 27);
console.assert(iterator.current === 0, 28);

iterator.next();
console.assert(iterator.count === 1, 29);
console.assert(iterator.current === 1, 30);

iterator = new Iterator({
  step: 1,
  start: NaN,
});
console.assert(iterator.count === 0, 31);
console.assert(iterator.current === 0, 32);

iterator.next();
console.assert(iterator.count === 1, 33);
console.assert(iterator.current === 1, 34);

iterator = new Iterator({
  step: "*",
  start: 0,
});

iterator.next().next().next();
console.assert(iterator.count === 3, 35);
console.assert(iterator.current === 16, 36);

iterator.reset().next().next();
console.assert(iterator.count === 2, {});
console.assert(iterator.current === 4, 37);

iterator = new Iterator({
  step: "asd",
  start: NaN,
});

iterator.next().next();
console.assert(iterator.count === 2, {});
console.assert(iterator.current === 2, 38);

iterator.reset().next().next();
console.assert(iterator.count === 2, {});
console.assert(iterator.current === 2, 39);

iterator = new Iterator({
  step: -1,
  start: 2,
});
console.assert(iterator.count === 0, {});
console.assert(iterator.current === 2, 40);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, {});
console.assert(iterator.current === 0, 41);

iterator = new Iterator({
  step: -11,
  start: -1,
});
console.assert(iterator.count === 0, {});
console.assert(iterator.current === -1, 42);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, {});
console.assert(iterator.current === -23, 43);

iterator = new Iterator({
  step: 0,
  start: 0,
});
console.assert(iterator.count === 0, {});
console.assert(iterator.current === 0, 44);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, {});
console.assert(iterator.current === 2, 45);

iterator = new Iterator({
  step: "*",
  start: -123,
});
console.assert(iterator.count === 0, {});
console.assert(iterator.current === -123, 46);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, {});
console.assert(iterator.current === 228886641, 47);

iterator = new Iterator({
  step: "+",
  start: -13,
});
console.assert(iterator.count === 0, {});
console.assert(iterator.current === -13, 48);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, {});
console.assert(iterator.current === -52, 49);

iterator = new Iterator({
  step: Infinity,
  start: BigInt(123),
});

console.assert(iterator.count === 0, {});
console.assert(iterator.current === 0, 50);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, {});
console.assert(iterator.current === 2, 51);

iterator = new Iterator({
  step: Infinity,
  start: Infinity,
});

console.assert(iterator.count === 0, {});
console.assert(iterator.current === 0, 52);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, {});
console.assert(iterator.current === 2, 53);

iterator = new Iterator({
  step: "-",
  start: 3,
});
console.assert(iterator.count === 0, 54);
console.assert(iterator.current === 3, 55);

iterator.next().next();
console.assert(iterator.count === 2, 56);
console.assert(iterator.current === -3, 57);

iterator = new Iterator({
  step: "/",
  start: 10,
});
console.assert(iterator.count === 0, 58);
console.assert(iterator.current === 10, 59);

iterator.next().next();
console.assert(iterator.count === 2, 60);
console.assert(iterator.current === 2.5, 61);

console.log("Tests finished");
