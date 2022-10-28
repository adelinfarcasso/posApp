export class Product {
  public name: string;
  public sku: string;
  public imgSrc: string;
  public description: string;
  public price: number;
  public category: string;

  constructor(
    name: string,
    sku: string,
    imgSrc: string,
    description: string,
    price: number,
    category: string
  ) {
    this.name = name;
    this.sku = sku;
    this.imgSrc = imgSrc;
    this.description = description;
    this.price = price;
    this.category = category;
  }
}
