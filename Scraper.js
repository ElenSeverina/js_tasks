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
class Scraper {
  constructor() {

  }
  products = [];

  productItems = document.querySelectorAll(".thumbnail");

  createCSV() {
    return `product name,prize,stars,reviews,info\r\nproducts`;
  }
  
  parse() {
    productItems.forEach(
      item => products.push(getProductName(item)),
      products.push(getProductPrice(item)),
      products.push(getProductStars(item)),
      products.push(getProductReview(item)),
      products.push(getProductInfo(item))
    )
    return this;
  }

  getProductName(item) {
    return item.querySelector("a").innerText;
  }

  getProductPrice(item) {
    return item.querySelector("h4").innerText;
  }

  getProductStars(item) {
    return item.querySelector("p[data-rating]").dataset.rating;
  }
  
  getProductReview(item) {
    return item.querySelector(".pull-right").innerText;
  }
  
  getProductInfo(item) {
    return item.querySelector(".description").innerText;
  }
  
  getSCV(products) {
    this.products
  };
}

const scrapper = new Scraper();
console.log(scrapper.parse().getSCV());

