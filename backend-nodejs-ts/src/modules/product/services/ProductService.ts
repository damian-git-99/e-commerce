import { ProductModel, Product } from '../models/ProductModel';

class ProductService {
  create(product: Product) {
    const newProduct = ProductModel.create(product);
    return newProduct;
  }

  public findAll() {
    const products = ProductModel.find({});
    return products;
  }

  findById(id: string) {
    const product = ProductModel.findById(id);
    return product;
  }

  async deleteById(id: string) {
    const product = await this.findById(id);
    if (product) {
      await product.remove();
      return true;
    } else {
      return false;
    }
  }
}

export const productService = new ProductService();
