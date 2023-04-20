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
    return item.querySelector(".title").innerText;
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
  newScrapper.createCSV() === "product name\tprice($)\tstars\treviews\tinfo\r\niPad Mini Retina\t537.99\t2\t8\tWi-Fi + Cellular, 32GB, Silver\r\nHewlett Packard...\t364.46\t1\t12\tHewlett Packard 250 G6 Dark Ash Silver, 15.6\" HD, Celeron N3060 1.6GHz, 4GB, 128GB SSD, DOS\r\nAcer Nitro 5 AN5...\t1140.62\t3\t14\tAcer Nitro 5 AN515-51, 15.6\" FHD IPS, Core i7-7700HQ, 8GB, 256GB SSD +1TB, GeForce GTX 1050 Ti 4GB, Windows 10 Home + Windows 10 Home",
  'scrap-test',
);
