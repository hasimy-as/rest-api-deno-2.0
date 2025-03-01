import { config } from "npm:dotenv";

import { productRouter } from "./routes/route.ts";
import { connectDb } from "./database/db.ts";

// Server setup
config();
await connectDb();

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);

  if (url.pathname.startsWith("/products")) {
    return await productRouter(req);
  }

  return new Response("Not Found", { status: 404 });
});
