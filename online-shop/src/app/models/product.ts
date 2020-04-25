export class Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  imgURL: string;

  // tslint:disable-next-line:max-line-length
  constructor(id, categoryId, name, description = '', price = 0, imgUrl = 'https://img.pngio.com/product-icon-png-76431-free-icons-library-product-png-256_256.jpg' ) {
    this.id = id;
    this.categoryId = categoryId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imgURL = imgUrl;
  }
}
