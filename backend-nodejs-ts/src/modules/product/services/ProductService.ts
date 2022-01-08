import { ProductModel } from '../models/ProductModel';

class ProductService {
  public findAll() {
    const products = ProductModel.find({});
    return products;
  }

  findById(id: string) {
    const product = ProductModel.findById(id);
    return product;
  }
}

export const productService = new ProductService();
