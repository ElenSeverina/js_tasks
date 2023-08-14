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

class ProductsAllInOneStrategy {
  #products = [];

  #getProductName(item) {
    return item.querySelector(".title").getAttribute("title");
  }

  #getProductPrice(item) {
    return item.querySelector(".price").innerText;
  }

  #getProductStars(item) {
    return item.querySelector("p[data-rating]").dataset.rating;
  }

  #getProductReview(item) {
    return item.querySelector("p.pull-right").innerText;
  }

  #getProductInfo(item) {
    return item.querySelector(".description").innerText;
  }

  #normalizeData({ name, price, stars, reviews, info }) {
    return {
      name,
      price: getNumberFromString(price),
      stars,
      reviews: getNumberFromString(reviews),
      info: info.replace(name, '').split(', ').filter(Boolean).join(', '),
    };
  }

  parse() {
    Array.from(document.querySelectorAll(".thumbnail"))
      .forEach(item => {
        this.#products.push(
          this.#normalizeData({
            name: this.#getProductName(item),
            price: this.#getProductPrice(item),
            stars: this.#getProductStars(item),
            reviews: this.#getProductReview(item),
            info: this.#getProductInfo(item),
          }),
        );
      });
  }

  getParsed() {
    return this.#products.reduce((arr, { name, price, stars, reviews, info }) => {
      return [
        ...arr,
        [name, price, stars, reviews, info],
      ];
    }, [['Product Name','Price($)', 'Stars', 'Reviews', 'Info']]);
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


let newScrapper = new Scrapper(strategy.create());
newScrapper.parse();
newScrapper.getParsed();
console.log(newScrapper.createCSV());
downloadFile('csv', newScrapper.createCSV(), 'data_from_tables.csv');
