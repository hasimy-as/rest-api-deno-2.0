export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

let products: Product[] = [
  { id: 1, name: "Laptop", price: 999.99, description: "A high-performance laptop" },
  { id: 2, name: "Phone", price: 699.99, description: "A powerful smartphone" },
];

export const getAllProducts = () => products;

export const getProductById = (id: number) => products.find((product) => product.id === id);

export const addProduct = (product: Omit<Product, "id">) => {
  const newProduct: Product = { id: products.length ? products[products.length - 1].id + 1 : 1, ...product };
  products.push(newProduct);

  return newProduct;
};

export const updateProduct = (id: number, updatedProduct: Omit<Product, "id">) => {
  const index = products.findIndex((product) => product.id === id);
  if (index !== -1) {
    products[index] = { id, ...updatedProduct };
    return products[index];
  }

  return null;
};

export const deleteProduct = (id: number) => {
  products = products.filter((product) => product.id !== id);
};
