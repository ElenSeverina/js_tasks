type GetNumberFromString = (str: string) => number | null;

interface IStrategy {
  parse(): void;
  getParsed(): (string | number)[][];
}

interface IScrapper extends IStrategy {
  createCSV(): string;
}

class Scrapper implements IScrapper {
  #strategy: IStrategy;

  constructor(scrap: IStrategy) {
    this.#strategy = scrap;
  }

  parse(): void {
    this.#strategy.parse();
  }

  getParsed(): (string | number)[][] {
    return this.#strategy.getParsed();
  }

  createCSV(): string {
    return this.#strategy.getParsed()
      .map((item) => {
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

class ProductsAllInOneStrategy implements IStrategy {
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

  #normalizeData({ name, price, stars, reviews, info }: Record<string, string>): ProductData {
    return {
      name,
      // @ts-ignore
      price: getNumberFromString(price),
      stars,
      // @ts-ignore
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

class UsersTablesStrategy implements IStrategy {
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

  getParsed(): (string)[][] {
    return [['First Name', 'Last Name', 'Username']].concat(this.#users);
  }
}

class PersonsTablesStrategy implements IStrategy {
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

  getParsed(): string[][] {
    return [['Person', 'Userdata']].concat(this.#persons);
  }
}

interface IStrategyFabric {
  create(): IStrategy | undefined;
}

class StrategyFabric implements IStrategyFabric {
  constructor() {
    this.#analyze();
  }

  #analyze(): string {
    return document.querySelector('[rel="canonical"')!.getAttribute('href')!.split('/').slice(-1)[0];
  }

  create() {
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

const newScrapper = new Scrapper(
  new StrategyFabric().create(),
)

newScrapper.parse();
newScrapper.getParsed();
console.log(newScrapper.createCSV());
downloadFile('csv', newScrapper.createCSV(), 'data_from_tables.csv');


