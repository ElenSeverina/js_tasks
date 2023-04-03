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
class Scraper {}

const productItems = Array.from(document.querySelectorAll(".caption"));
const productRatings = Array.from(document.querySelectorAll(".ratings"));
let productNames = getProductNames(productItems);
let productPrices = getProductPrices(productItems);
let productStars = getProductStars(productRatings);
let productReviews = getProductReviews(productRatings);
let productDescriptions = getProductDescriptions(productItems);

function getProductNames(array) {
  return array.map(function (elem) {
    return elem.querySelector("a").innerText;
  });
}

function getProductPrices(array) {
  return array.map(function (elem) {
    return elem.querySelector("h4").innerText;
  });
}

function getProductStars(array) {
  return array.map(function (elem) {
    return elem.querySelector("p[data-rating]").dataset.rating;
  });
}

function getProductReviews(array) {
  return array.map(function (elem) {
    return elem.querySelector(".pull-right").innerText;
  });
}

function getProductDescriptions(array) {
  return array.map(function (elem) {
    return elem.querySelector(".description").innerText;
  });
}

function createCSV() {
  return `product name,prize,stars,reviews,info`;
}
