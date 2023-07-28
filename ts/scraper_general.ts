class Scrapper {
  #strategy: ProductsAllInOneStrategy | UsersTablesStrategy | PersonsTablesStrategy;

  constructor(scrap: ProductsAllInOneStrategy | UsersTablesStrategy | PersonsTablesStrategy) {
    this.#strategy = scrap;
  }

  parse(): void {
    this.#strategy.parse();
  }

  getParsed(): (string | number)[] {
    return this.#strategy.getParsed();
  }

  createCSV(): string {
    return this.#strategy.getParsed()
      .map((item: (string | number)[]) => {
        return item
          .map((v) => typeof v === 'number' ? String(v).replace('.', ',') : v)
          .join('\t');
      }).join('\r\n');
  }
}

interface ProductData {
  name: string;
  price: number;
  stars: string;
  reviews: number;
  info: string;
}

type NumberFromString = (value: string) => number | null;

class ProductsAllInOneStrategy {
  #products: ProductData[] = [];

  #getProductName(item: HTMLElement): string {
    return (item.querySelector(".title") as HTMLElement)?.getAttribute("title") || "";
  }

  #getProductPrice(item: HTMLElement): string {
    return (item.querySelector(".price") as HTMLElement)?.innerText || "";
  }

  #getProductStars(item: HTMLElement): string {
    return (item.querySelector("p[data-rating]") as HTMLElement)?.dataset.rating || "";
  }

  #getProductReview(item: HTMLElement): string {
    return (item.querySelector("p.pull-right") as HTMLElement)?.innerText;
  }

  #getProductInfo(item: HTMLElement): string {
    return (item.querySelector(".description") as HTMLElement)?.innerText;
  }

  #normalizeData({ name, price, stars, reviews, info }: ProductData): ProductData {
    return {
      name,
      price: getNumberFromString(price),
      stars,
      reviews: getNumberFromString(reviews),
      info: info.replace(name, '').split(', ').filter(Boolean).join(', '),
    };
  }

  parse(): void {
    Array.from(document.querySelectorAll(".thumbnail")).forEach(item => {
      if (item instanceof HTMLElement) {
        this.#products.push(
          this.#normalizeData({
            name: this.#getProductName(item),
            price: this.#getProductPrice(item),
            stars: this.#getProductStars(item),
            reviews: this.#getProductReview(item),
            info: this.#getProductInfo(item),
          }),
        );
      }
    });
  }

  getParsed(): (string | number)[][] {
    return this.#products.reduce((result: (string | number)[][], { name, price, stars, reviews, info }) => {
      return [
        ...result,
        [name, price, stars, reviews, info],
      ];
    }, [['Product Name', 'Price($)', 'Stars', 'Reviews', 'Info']]);
  }
}

class UsersTablesStrategy {
  #users: string[][] = [];

  #getUsersData(): HTMLElement[] {
    return Array.from(document.querySelectorAll("tr"));
  }

  parse(): void {
    this.#getUsersData()
      .slice(-3)
      .forEach((item: HTMLElement) => {
        this.#users.push(
          item.innerText.split('\t').slice(1)
        );
      });
  }
  
  getParsed(): (string | string[])[] {
    return [['First Name', 'Last Name', 'Username']].concat(this.#users);
  }
}

class PersonsTablesStrategy {
  #persons: string[][] = [];

  #getUsersData(): HTMLElement[] {
    return Array.from(document.querySelectorAll("tr"));
  }

  parse() {
    this.#getUsersData()
      .slice(-3)
      .forEach((item: HTMLElement) => {
        let i = item.innerText.split('\t').slice(1);
        this.#persons.push([`${i[0]} ${i[1]}`, `${i[2]}`]);
      });
  }
  
  getParsed(): (string | string[])[] {
    return [['Person', 'Userdata']].concat(this.#persons);
  }
}


class StrategyFabric {
  constructor() {
    this.#analyze();
  }

  #analyze(): string {
    return document.querySelector('[rel="canonical"')!.getAttribute('href')!.split('/').slice(-1)[0];
  }

  create(): ProductsAllInOneStrategy | UsersTablesStrategy | undefined {
    if (this.#analyze() === 'allinone') { return new ProductsAllInOneStrategy(); }
    if (this.#analyze() === 'tables-semantically-correct') { return new UsersTablesStrategy(); }
    return undefined;
  }
}

type FileType = 'csv' | 'txt';
type FileContent = string;
type FileName = string;

const downloadFile = (type: FileType, content: FileContent, name: FileName): void => {
  const prefix = type === 'csv'
    ? 'data:text/csv;charset=utf-8,'
    : 'data:text/plain;charset=utf-8,';

  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(`${prefix}${content}`));
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

type ScrapperStrategy = ProductsAllInOneStrategy | UsersTablesStrategy;

let strategy = new StrategyFabric();

let newScrapper: ScrapperStrategy | undefined = strategy.create();

if (newScrapper) {
  newScrapper.parse();
  newScrapper.getParsed();
  console.log(newScrapper.createCSV());
  downloadFile('csv', newScrapper.createCSV(), 'data_from_tables.csv');
}