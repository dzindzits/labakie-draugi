"use server";

import { cookies } from "next/headers";
import executeQuery, { Product, searchByArticleQuery } from "./db";

export async function addProduct(formData: FormData) {
  "use server";
  const products = await executeQuery<Product[]>(
    searchByArticleQuery(formData.get("article") as string)
  );
  if (products && products.length > 0) {
    const product = products[0];

    const orderCookie = cookies().get("order");
    let order: Product[] = [];

    if (orderCookie) {
      order = JSON.parse(orderCookie.value);
    }

    if (!order.find((item) => item.article === product.article))
      order.push(product);

    cookies().set("order", JSON.stringify(order), { httpOnly: true });
  }
}

export async function emptyOrder() {
  cookies().set("order", JSON.stringify([]), { httpOnly: true });
}
