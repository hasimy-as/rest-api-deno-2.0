import client from "../database/db.ts";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const getAllProducts = async (): Promise<Product[]> => {
  const result = await client.query<Product>("SELECT * FROM products");
  return result.rows;
};

export const getProductById = async (id: number): Promise<Product | null> => {
  const result = await client.query<Product>("SELECT * FROM products WHERE id = $1", id);
  return result.rows.length ? result.rows[0] : null;
};

export const addProduct = async (product: Omit<Product, "id">): Promise<Product> => {
  const result = await client.query<Product>(
    "INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *",
    product.name, product.price, product.description,
  );
  return result.rows[0];
};

export const updateProduct = async (id: number, product: Omit<Product, "id">): Promise<Product | null> => {
  const result = await client.query<Product>(
    "UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *",
    product.name, product.price, product.description, id,
  );
  return result.rows.length ? result.rows[0] : null;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await client.query("DELETE FROM products WHERE id = $1", id);
};
