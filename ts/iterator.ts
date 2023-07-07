// @ts-nocheck
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

type IteratorOptions = {
  start: unknown;
  step: unknown;
};

type StepFunction = (current: number) => number;
type Step = number | '+' | '*' | StepFunction;

type IteratorHandler = {
  step: Step;
  start: number;
  count: number;
  current: number;
  next: () => IteratorHandler;
  reset: () => IteratorHandler;
};

function Iterator(this: IteratorHandler, options?: IteratorOptions) {
  let step;
  let start;

  this.next = () => {
    let newStep = step;
    this.count++;

    if (typeof step === "function") {
      newStep = step(this.current);
    }

    if (typeof step === "number") {
      newStep = this.current + step;
    }

    if (step === '+') {
      newStep = this.current + this.current || 1;
    }

    if (step === '*') {
      newStep = this.current === 1
        ? 2
        : this.current * this.current || 2;
    }

    this.current = newStep as number;

    return this;
  };

  this.reset = () => {
    this.count = 0;
    let { start = 0, step = 1 } = options || {};
    start = start as number;
    this.current = start as number;
    step = step as number;

    if (
      typeof step === 'string'
      && step !== '+'
      && step !== '*'
    ) {
      step = 1;
    }

    if (
      typeof step === 'number'
      && (step === 0
        || Number.isNaN(step)
        || Math.abs(step) === Infinity)
    ) {
      step = 1;
    }

    if (
      typeof step === 'object'
      && typeof step !== 'function'
    ) {
      step = 1;
    }

    if (
      typeof start !== 'number'
      || Number.isNaN(start)
      || Math.abs(start) === Infinity) {
      this.current = 0;
    }
    return this;
  };

  this.reset();
}

const $data = { toString: () => new Error() };

let iterator = new Iterator();
console.assert(iterator.count === 0, $data);
console.assert(iterator.current === 0, $data);

iterator.next();
console.assert(iterator.count === 1, $data);
console.assert(iterator.next().count === 2, $data);
console.assert(iterator.current === 2, $data);

iterator.reset();
console.assert(iterator.count === 0, $data);
console.assert(iterator.current === 0, $data);

iterator = new Iterator({
  step: 2,
  start: 1,
});
console.assert(iterator.count === 0, $data);
console.assert(iterator.current === 1, $data);

iterator.next();
console.assert(iterator.count === 1, $data);
console.assert(iterator.current === 3, $data);

iterator = new Iterator({
  step: '*',
  start: 3,
});
console.assert(iterator.count === 0, $data);
console.assert(iterator.current === 3, $data);

iterator.next();
console.assert(iterator.count === 1, $data);
console.assert(iterator.current === 9, $data);

iterator = new Iterator({
  step: '+',
  start: 0,
});

console.assert(iterator.count === 0, $data);
console.assert(iterator.current === 0, $data);

iterator.next();
console.assert(iterator.count === 1, $data);
console.assert(iterator.current === 1, $data);

iterator.next().next();
console.assert(iterator.count === 3, $data);
console.assert(iterator.current === 4, $data);

iterator = new Iterator({
  step: (current) => current + 66,
  start: 0,
});
iterator.next();
console.assert(iterator.current === 66, $data);

iterator = new Iterator({
  step: 2,
  start: "two",
});
console.assert(iterator.count === 0, $data);
console.assert(iterator.current === 0, $data);

iterator.next();
console.assert(iterator.count === 1, $data);
console.assert(iterator.current === 2, $data);

iterator = new Iterator({
  step: {},
  start: {},
});
console.assert(iterator.count === 0, $data);
console.assert(iterator.current === 0, $data);

iterator.next();
console.assert(iterator.count === 1, $data);
console.assert(iterator.current === 1, $data);

iterator = new Iterator({
  step: 1,
  start: NaN,
});
console.assert(iterator.count === 0, $data);
console.assert(iterator.current === 0, $data);

iterator.next();
console.assert(iterator.count === 1, $data);
console.assert(iterator.current === 1, $data);

iterator = new Iterator({
  step: '*',
  start: 0,
});

iterator.next().next().next();
console.assert(iterator.count === 3, $data);
console.assert(iterator.current === 16, $data);

iterator.reset().next().next();
console.assert(iterator.count === 2, $data);
console.assert(iterator.current === 4, $data);

iterator = new Iterator({
  step: 'asd',
  start: NaN,
});

iterator.next().next();
console.assert(iterator.count === 2, $data);
console.assert(iterator.current === 2, $data);

iterator.reset().next().next();
console.assert(iterator.count === 2, $data);
console.assert(iterator.current === 2, $data);

iterator = new Iterator({
  step: -1,
  start: 2,
});
console.assert(iterator.count === 0, $data);
console.assert(iterator.current === 2, $data);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, $data);
console.assert(iterator.current === 0, $data);

iterator = new Iterator({
  step: -11,
  start: -1,
});
console.assert(iterator.count === 0, $data);
console.assert(iterator.current === -1, $data);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, $data);
console.assert(iterator.current === -23, $data);

iterator = new Iterator({
  step: 0,
  start: 0,
});
console.assert(iterator.count === 0, $data);
console.assert(iterator.current === 0, $data);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, $data);
console.assert(iterator.current === 2, $data);

iterator = new Iterator({
  step: '*',
  start: -123,
});
console.assert(iterator.count === 0, $data);
console.assert(iterator.current === -123, $data);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, $data);
console.assert(iterator.current === 228886641, $data);

iterator = new Iterator({
  step: '+',
  start: -13,
});
console.assert(iterator.count === 0, $data);
console.assert(iterator.current === -13, $data);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, $data);
console.assert(iterator.current === -52, $data);

iterator = new Iterator({
  step: Infinity,
  start: BigInt(123),
});

console.assert(iterator.count === 0, $data);
console.assert(iterator.current === 0, $data);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, $data);
console.assert(iterator.current === 2, $data);

iterator = new Iterator({
  step: Infinity,
  start: Infinity,
});

console.assert(iterator.count === 0, $data);
console.assert(iterator.current === 0, $data);

iterator.next().next().reset().next().next();
console.assert(iterator.count === 2, $data);
console.assert(iterator.current === 2, $data);

iterator = new Iterator({
  step: 3.5,
  start: 2.1
});

console.assert(
  JSON.stringify(
    new Array(4).fill('').map((_, i) => !!i ? iterator.next().current : iterator.current),
  ) === '[2.1,5.6,9.1,12.6]',
  $data
);

iterator = new Iterator({
  step: (v) => v * 4,
  start: 1,
});

console.assert(
  JSON.stringify(
    new Array(4).fill('').map((_, i) => !!i ? iterator.next().current : iterator.current),
  ) === '[1,4,16,64]',
  $data
);

iterator = new Iterator({
  step: '+',
  start: 0,
});

console.assert(
  JSON.stringify(
    new Array(5).fill('').map((_, i) => !!i ? iterator.next().current : iterator.current),
  ) === '[0,1,2,4,8]',
  $data
);

iterator = new Iterator({
  step: '*',
  start: 0,
});

console.assert(
  JSON.stringify(
    new Array(4).fill('').map((_, i) => !!i ? iterator.next().current : iterator.current),
  ) === '[0,2,4,16]',
  $data
);

iterator = new Iterator({
  step: '*',
  start: 1,
});

console.assert(
  JSON.stringify(
    new Array(4).fill('').map((_, i) => !!i ? iterator.next().current : iterator.current),
  ) === '[1,2,4,16]',
  $data
);

console.log('Tests finished');