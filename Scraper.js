/*
    Goal:
    Develop a Scraper class to use for scrapping text information from pages.

    Page 1:
    https://webscraper.io/test-sites/e-commerce/allinone
    Your Goal to scrap information in this csv format:
    product name,prize,stars,reviews,info

    Page 2:
    https://webscraper.io/test-sites/tables
    Your Goal to scrap information from all the tables in separate csv files in 2 formats:
    - first name,last name,user name
    - person,user data
*/
class Scrapper {
  constructor() {
  }
  
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
  
  parse() {
    Array.from(document.querySelectorAll(".thumbnail"))
      .forEach(item => {
        this.#products.push({
          name: this.#getProductName(item), 
          price: this.#getProductPrice(item), 
          stars: this.#getProductStars(item), 
          reviews: this.#getProductReview(item),
          info: this.#getProductInfo(item)
        });
      });
  }
  
  createCSV() {
    let arr = [`product name\tprice($)\tstars\treviews\tinfo`];
    this.#products.map(item => {
      arr.push(`${item.name}\t${item.price.slice(1)}\t${item.stars}\t${+/\d+/.exec(item.reviews)}\t${item.info}`);
    });
    return arr.join('\r\n')
  }
}

let newScrapper = new Scrapper();

newScrapper.parse();
newScrapper.createCSV();

console.assert(
  newScrapper.createCSV() === "product name\tprice($)\tstars\treviews\tinfo\r\nLenovo ThinkPad T470\t1349.23\t1\t5\tLenovo ThinkPad T470, 14\" FHD IPS, Core i5-7200U, 8GB, 256GB SSD, Windows 10 Pro\r\nLenovo IdeaPad Miix 510 Platinum Silver\t1212.16\t4\t0\tLenovo IdeaPad Miix 510 Platinum Silver, 12.2\" IPS Touch, Core i5-7200U, 8GB, 256GB SSD, 4G, Windows 10 Pro\r\nMSI GL72M 7RDX\t1099.00\t4\t1\tMSI GL72M 7RDX, 17.3\" FHD, Core i5-7300HQ, 8GB, 1TB + 128GB SSD, GeForce GTX 1050 2GB, Windows 10 Home",
  'scrap-test',
);
