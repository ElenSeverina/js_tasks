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

class UsersTablesStrategy {
  #users = [];

  #getUsersData() {
    return Array.from(document.querySelectorAll("tr"))
  }

  parse() {
    this.#getUsersData()
      .slice(-3)
      .forEach(item => {
        this.#users.push(
          item.innerText.split('\t').slice(1)
        );
      });
  }
  
  getParsed() {
    return [['First Name', 'Last Name', 'Username']].concat(this.#users);
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

let newScrapper = new Scrapper(new UsersTablesStrategy());

newScrapper.parse();
newScrapper.getParsed();
newScrapper.createCSV();

console.assert(
  newScrapper.createCSV() === "First Name\tLast Name\tUsername\r\nMark\tOtto\t@mdo\r\nJacob\tThornton\t@fat\r\nLarry\tthe Bird\t@twitter",
  'scrap-test',
);

downloadFile('csv', newScrapper.createCSV(), 'tables-multiple-header-rows');
