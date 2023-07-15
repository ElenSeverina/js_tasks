class StrategyFabric {
  constructor() {
    this.#analyze();
  }

  #analyze() {
    return document.querySelector('[rel="canonical').getAttribute('href').split('/').slice(-1)[0];
  }

  create() {
    if (this.#analyze() === 'allinone') { return new ProductsAllInOneStrategy() }
    if (this.#analyze() === 'tables-semantically-correct') { return new UsersTablesStrategy() }
  }
}

let strategy = new StrategyFabric();

strategy.create();
