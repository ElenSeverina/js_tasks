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

let newScrapper = new Scrapper(new PersonsTablesStrategy());

newScrapper.parse();
newScrapper.getParsed();
newScrapper.createCSV();

console.assert(
  newScrapper.createCSV() === "Person\tUserdata\r\nMark Otto\t@mdo\r\nJacob Thornton\t@fat\r\nLarry the Bird\t@twitter",
  'scrap-test',
);
