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

  productData = {
    name: '', 
    price: '', 
    stars: '', 
    reviews: '',
    info: ''
  };
  
  products = [];
  parse() {
    document.querySelectorAll(".thumbnail").forEach(item => {
      productData = {
        name: getProductName(item), 
        price: getProductPrice(item), 
        stars: getProductStars(item), 
        reviews: getProductReview(item),
        info: getProductInfo(item)
      }
      products.push(productData);
    })
    return products;
  }
  
  getProductName() {
    return item.querySelector(".title").innerText;
  }
  getProductPrice() {
    return item.querySelector(".price").innerText;
  }
  
  getProductStars() {
    return item.querySelector("p[data-rating]").dataset.rating;
  }
  
  getProductReview() {
    return item.querySelector("p.pull-right").innerText;
  }
  
  getProductInfo() {
    return item.querySelector(".description").innerText;
  }
  
  createCSV() {
    products.forEach(item => {
      console.log(item);
    });
  }
}

let newScrapper = new Scrapper();
newScrapper.parse().createCSV();
