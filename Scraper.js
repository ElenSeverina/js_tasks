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
    let arr = ['product name,prize,stars,reviews,info'];
    this.#products.map(item => {
      arr.push(`${item.name}, ${item.price}, ${item.stars}, ${item.reviews}, ${item.info}`);
    });
    arr.forEach((item => {console.log(item)}))
  }
}

let newScrapper = new Scrapper();

newScrapper.parse();
newScrapper.createCSV();

// product name,prize,stars,reviews,info
