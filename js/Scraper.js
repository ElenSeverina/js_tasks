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

// TODO namimg
// ScrapperAllInOne -> ProductsAllInOneStrategy
class ScrapperAllInOne {
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

    console.log(this.#products);
  }

  getParsed() {
    // TODO create realization



    return [
      ['Product Name','Prize($)', 'Stars', 'Review', 'Info'],
      ['Asus ASUSPRO B9440UA-GV0279R Gray','1381,13', '1', '4', '14" FHD, Core i7-7500U, 16GB, 512GB SSD, Windows 10 Pro, Eng kbd'],
    ];
  }
}


class Scrapper {
  #scrap // TODO rename correctly -> #strategy

  constructor(scrap) {
    this.#scrap = scrap;
  }

  parse() {
    this.#scrap.parse();
  }

  createCSV() {
    // TODO add normalizer for csv . -> ,
    return this.#scrap.getParsed()
      .map((item) => item.join('\t')).join('\r\n');
  }

  createXML() {

  }
}

let newScrapper = new Scrapper(
  new ScrapperAllInOne()
);

newScrapper.parse();
// newScrapper.createCSV();

// console.assert(
//   newScrapper.createCSV() === "product name\tprice($)\tstars\treviews\tinfo\r\nLenovo ThinkPad T470\t1349.23\t1\t5\tLenovo ThinkPad T470, 14\" FHD IPS, Core i5-7200U, 8GB, 256GB SSD, Windows 10 Pro\r\nLenovo IdeaPad Miix 510 Platinum Silver\t1212.16\t4\t0\tLenovo IdeaPad Miix 510 Platinum Silver, 12.2\" IPS Touch, Core i5-7200U, 8GB, 256GB SSD, 4G, Windows 10 Pro\r\nMSI GL72M 7RDX\t1099.00\t4\t1\tMSI GL72M 7RDX, 17.3\" FHD, Core i5-7300HQ, 8GB, 1TB + 128GB SSD, GeForce GTX 1050 2GB, Windows 10 Home",
//   'scrap-test',
// );

// [1,2,3].join('\t') -> `1\t2\t3`
// DRY!!!



// const mockStructure = [
//   'Product Name, Prize($), Stars, Review, Info',
// ];
// mockStructure[0].join('\t');


// const result = [
//   'Product Name\tPrize($)\tStars\tReviewt\Info'
// ];

// Mock
//  !!!
//  ScrapperAllInOne -> logic parsing -> create structure -> Scrapper get created structure -> create csv from structure -> csv
