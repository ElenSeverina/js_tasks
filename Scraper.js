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

let productItems = document.querySelector(".thumbnail");
let productDescription = [];
productItems.forEach(function (item) {
  productDescription.push(
    getProductName(item),
    getProductPrice(item),
    getProductStars(item),
    getProductReview(item),
    getProductInfo(item)
  )
});

function getProductName(item) {
  return item.querySelector(".title").innerText;
}
function getProductPrice(item) {
  return item.querySelector(".price").innerText;
}

function getProductStars(item) {
  return item.querySelector("p[data-rating]").dataset.rating;
}

function getProductReview(item) {
  return item.querySelector("p.pull-right").innerText;
}

function getProductInfo(item) {
  return item.querySelector(".description").innerText;
}
