import {
  Product,
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from "../models/productModels.ts";

import Logger from "../utils/logger.ts";

export const getProducts = (): Response => {
  const products = getAllProducts();

  Logger.info(`Products found: ${JSON.stringify(products)}`);
  return new Response(JSON.stringify(products), { status: 200, headers: { "Content-Type": "application/json" } });
};

export const getProduct = (id: number): Response => {
  const product = getProductById(id);
  if (product) {
    Logger.info(`Product found: ${JSON.stringify(product)}`);
    return new Response(JSON.stringify(product), { status: 200, headers: { "Content-Type": "application/json" } });
  }

  Logger.error("Product not found");
  return new Response("Product not found", { status: 404 });
};

export const createProduct = async (req: Request): Promise<Response> => {
  const body = await req.json();
  const newProduct: Omit<Product, "id"> = { name: body.name, price: body.price, description: body.description };
  const addedProduct = addProduct(newProduct);

  Logger.info(`Product added: ${JSON.stringify(addedProduct)}`);
  return new Response(JSON.stringify(addedProduct), { status: 201, headers: { "Content-Type": "application/json" } });
};

export const updateProductById = async (id: number, req: Request): Promise<Response> => {
  const body = await req.json();
  const updatedProduct: Omit<Product, "id"> = { name: body.name, price: body.price, description: body.description };
  const result = updateProduct(id, updatedProduct);

  if (result) {
    Logger.info(`Product updated: ${JSON.stringify(result)}`);
    return new Response(JSON.stringify(result), { status: 200, headers: { "Content-Type": "application/json" } });
  }

  Logger.error("Product not found");
  return new Response("Product not found", { status: 404 });
};

export const deleteProductById = (id: number): Response => {
  deleteProduct(id);

  Logger.info("Product deleted");
  return new Response("Product deleted", { status: 200 });
};
