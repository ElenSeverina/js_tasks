/*
    Goal:
    Develop a Scraper class to use for scrapping text information from pages.
    Page 1:
    https://webscraper.io/test-sites/e-commerce/allinone
    Your Goal to scrap information in this csv format:
    Product Name,Prize($),Stars,Reviews,Info
    Page 2:
    https://webscraper.io/test-sites/tables
    Your Goal to scrap information from all the tables in separate csv files in 2 formats:
    - first name,last name,user name
    - person,user data
*/

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
    // new (class {})();
  }
}

class UsersTablesStrategy {
  #users = [];

  #getUsersData() {
    return Array.from(document.querySelectorAll("tbody>tr"))
  }

  parse() {
    this.#getUsersData()
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

// let newScrapper = new Scrapper(new ProductsAllInOneStrategy());
let newScrapper = new Scrapper(new UsersTablesStrategy());
// let newScrapper = new Scrapper(new StrategyFabric().create());

newScrapper.parse();
newScrapper.getParsed();
newScrapper.createCSV();

// console.assert(
//   newScrapper.createCSV() === "Product Name\tPrice($)\tStars\tReviews\tInfo\r\nAsus ASUSPRO B9440UA-GV0279R Gray\t1381,13\t1\t4\t14\" FHD, Core i7-7500U, 16GB, 512GB SSD, Windows 10 Pro, Eng kbd\r\nThinkPad X240\t1311,99\t3\t12\t12.5\", Core i5-4300U, 8GB, 240GB SSD, Win7 Pro 64bit\r\nLenovo V510 Black\t484,23\t3\t8\t14\" HD, Core i3-6006U, 4GB, 128GB SSD, Windows 10 Home",
//   'scrap-test',
// );

console.assert(
  newScrapper.createCSV() === "First Name\tLast Name\tUsername\r\nMark\tOtto\t@mdo\r\nJacob\tThornton\t@fat\r\nLarry\tthe Bird\t@twitter\r\nHarry\tPotter\t@hp\r\nJohn\tSnow\t@dunno\r\nTim\tBean\t@timbean",
  'scrap-test',
);

// downloadFile('csv', newScrapper.createCSV(), 'all-in-one.csv');
downloadFile('csv', newScrapper.createCSV(), 'tables-semantically-correct');
