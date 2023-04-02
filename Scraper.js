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

}

const productItems = Array.from(document.querySelectorAll('.caption'));
let itemNames = getProductName(productItems);
function getProductName(array) {
    return array.map(function(elem) {
        return elem.querySelector('a').innerText;
    });
}
console.log(itemNames);

function createCSV() {
  return `product name,prize,stars,reviews,info`;
}


//! work
// const productItems = Array.from(document.querySelectorAll('.caption'));
// productItems.forEach(function(elem) {
//     console.log(elem.querySelector('a').innerText)
// })
