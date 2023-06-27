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

let newScrapper = new Scrapper(new ProductsAllInOneStrategy());

newScrapper.parse();
newScrapper.getParsed();
newScrapper.createCSV();

console.assert(
  newScrapper.createCSV() === "Product Name\tPrice($)\tStars\tReviews\tInfo\r\nAsus ASUSPRO B9440UA-GV0279R Gray\t1381,13\t1\t4\t14\" FHD, Core i7-7500U, 16GB, 512GB SSD, Windows 10 Pro, Eng kbd\r\nThinkPad X240\t1311,99\t3\t12\t12.5\", Core i5-4300U, 8GB, 240GB SSD, Win7 Pro 64bit\r\nLenovo V510 Black\t484,23\t3\t8\t14\" HD, Core i3-6006U, 4GB, 128GB SSD, Windows 10 Home",
  'scrap-test',
);
