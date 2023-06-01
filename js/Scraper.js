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

    //console.log(this.#products);
  }

  getParsed() {
    let parsedProducts = this.#products.reduce((arr, item) => {
      arr.push([item.name, item.price, item.stars, item.reviews, item.info])
      return arr;
    }, [['Product Name','Price($)', 'Stars', 'Reviews', 'Info']]);
    return parsedProducts;
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

  getParsed() {
    this.#scrap.getParsed();
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
  new ProductsAllInOneStrategy()
);

newScrapper.parse();
newScrapper.getParsed();

console.assert(
  newScrapper.createCSV() === "Product Name\tPrice($)\tStars\tReviews\tInfo\r\nAsus ASUSPRO B9440UA-GV0279R Gray\t1381.13\t1\t4\t14\" FHD, Core i7-7500U, 16GB, 512GB SSD, Windows 10 Pro, Eng kbd\r\nThinkPad X240\t1311.99\t3\t12\t12.5\", Core i5-4300U, 8GB, 240GB SSD, Win7 Pro 64bit\r\nLenovo V510 Black\t484.23\t3\t8\t14\" HD, Core i3-6006U, 4GB, 128GB SSD, Windows 10 Home",
  'scrap-test',
);

// [1,2,3].join('\t') -> `1\t2\t3`
// DRY!!!


// const mockStructure = [
//   'Product Name, Price($), Stars, Review, Info',
// ];
// mockStructure[0].join('\t');


// const result = [
//   'Product Name\tPrice($)\tStars\tReviewt\Info'
// ];

// Mock
//  !!!
//  ScrapperAllInOne -> logic parsing -> create structure -> Scrapper get created structure -> create csv from structure -> csv