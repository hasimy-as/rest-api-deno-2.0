import { getProducts, getProduct, createProduct, updateProductById, deleteProductById } from "../controllers/productController.ts";

export const productRouter = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const method = req.method;
  const id = url.pathname.split("/")[2];

  switch (method) {
    case "GET":
      return id ? getProduct(Number(id)) : getProducts();
    
    case "POST":
      return await createProduct(req);

    case "PUT":
      if (!id) return new Response("Product ID required", { status: 400 });
      return await updateProductById(Number(id), req);

    case "DELETE":
      if (!id) return new Response("Product ID required", { status: 400 });
      return deleteProductById(Number(id));

    default:
      return new Response("Method not allowed", { status: 405 });
  }
};
