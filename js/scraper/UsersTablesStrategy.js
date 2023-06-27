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

let newScrapper = new Scrapper(new UsersTablesStrategy());

newScrapper.parse();
newScrapper.getParsed();
newScrapper.createCSV();

console.assert(
  newScrapper.createCSV() === "First Name\tLast Name\tUsername\r\nMark\tOtto\t@mdo\r\nJacob\tThornton\t@fat\r\nLarry\tthe Bird\t@twitter",
  'scrap-test',
);

downloadFile('csv', newScrapper.createCSV(), 'tables-multiple-header-rows');
