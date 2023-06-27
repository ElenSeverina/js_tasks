class StrategyFabric {
  constructor() {
    this.#analyze();
  }

  #analyze() {
    return document.querySelector('[rel="canonical').getAttribute('href').split('/').slice(-1)[0];
  }

  create() {
    if ('allinone') { return new ProductsAllInOneStrategy() }
    if ('tables-semantically-correct') { return new UsersTablesStrategy() }
  }
}

let strategy = new StrategyFabric();
