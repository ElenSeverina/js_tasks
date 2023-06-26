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

class PersonsTablesStrategy {
  #persons = [];

  #getUsersData() {
    return Array.from(document.querySelectorAll("tr"))
  }

  parse() {
    this.#getUsersData()
      .slice(-3)
      .forEach(item => {
        let i = item.innerText.split('\t').slice(1);
        this.#persons.push([`${i[0]} ${i[1]}`, `${i[2]}`]);
      });
  }
  
  getParsed() {
    return [['Person', 'Userdata']].concat(this.#persons);
  }
}

const downloadFile = (type, content, name) => {
  const prefix = type === 'csv'
    ? 'data:text/csv;charset=utf-8,'
    : 'data:text/csv;charset=utf-8,';

  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(`${prefix}${content}`));
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

let newScrapper = new Scrapper(new PersonsTablesStrategy());

newScrapper.parse();
newScrapper.getParsed();
newScrapper.createCSV();

console.assert(
  newScrapper.createCSV() === "Person\tUserdata\r\nMark Otto\t@mdo\r\nJacob Thornton\t@fat\r\nLarry the Bird\t@twitter",
  'scrap-test',
);

downloadFile('csv', newScrapper.createCSV(), 'tables-multiple-header-rows');
