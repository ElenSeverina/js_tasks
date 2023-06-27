class Scrapper {
  #strategy

  constructor(scrap) {
    this.#strategy = scrap;
  }

  parse() {
    this.#strategy.parse();
  }

  getParsed() {
    this.#strategy.getParsed();
  }

  createCSV() {
    return this.#strategy.getParsed()
      .map((item) => {
        return item
          .map((v) => typeof v == 'number' ? String(v).replace('.', ',') : v)
          .join('\t')
      }).join('\r\n');
  }
}