import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
} from "../models/productModels.ts";

import Logger from "../utils/logger.ts";

export const getProducts = async (): Promise<Response> => {
  const products = await getAllProducts();

  Logger.info(`Products queried. Total products: ${products.length}`);
  return new Response(JSON.stringify(products), { status: 200, headers: { "Content-Type": "application/json" } });
};

export const getProduct = async (id: number): Promise<Response> => {
  const product = await getProductById(id);
  if (product) {
    Logger.info("Product found.");
    return new Response(JSON.stringify(product), { status: 200, headers: { "Content-Type": "application/json" } });
  }

  Logger.error("Product not found");
  return new Response("Product not found", { status: 404 });
};

export const createProduct = async (req: Request): Promise<Response> => {
  const body = await req.json();
  const newProduct = { name: body.name, price: body.price, description: body.description };
  const addedProduct = await addProduct(newProduct);

  Logger.info("Product added");
  return new Response(JSON.stringify(addedProduct), { status: 201, headers: { "Content-Type": "application/json" } });
};

export const updateProductById = async (id: number, req: Request): Promise<Response> => {
  const body = await req.json();
  const updatedProduct = { name: body.name, price: body.price, description: body.description };
  const result = await updateProduct(id, updatedProduct);

  if (result) {
    Logger.info("Product updated");
    return new Response(JSON.stringify(result), { status: 200, headers: { "Content-Type": "application/json" } });
  }

  Logger.error("Product not found");
  return new Response("Product not found", { status: 404 });
};

export const deleteProductById = async (id: number): Promise<Response> => {
  await deleteProduct(id);

  Logger.info("Product deleted");
  return new Response("Product deleted", { status: 200 });
};
