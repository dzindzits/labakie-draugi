import mysql from "mysql2/promise";
import { cookies } from "next/headers";

export type Product = {
  name: string;
  article: string;
  weight: number;
  location: string;
  quantity: number;
};

export default async function executeQuery<T>(query: string) {
  try {
    const connection = await mysql.createConnection({
      host: "server43.areait.lv",
      user: "sansalv_kristers",
      database: "sansalv_labakie",
      password: "!My-Pass123",
    });
    const [results] = await connection.query(query);
    await connection.end();
    return results as T;
  } catch (error) {
    console.error(error);
  }
}

export function searchQuery(query: string) {
  return `SELECT * FROM products WHERE name LIKE '${query}%' OR article LIKE '${query}%'`;
}

export function searchByArticleQuery(article: string) {
  return `SELECT * FROM products WHERE article = '${article}'`;
}

export function registerQuery(formData: FormData) {
  return `INSERT INTO products (name, article, weight, location, quantity) VALUES ('${formData.get(
    "name"
  )}', '${formData.get("article")}', ${parseInt(
    formData.get("weight") as string
  )}, '${formData.get("location")}', ${parseInt(
    formData.get("quantity") as string
  )})`;
}

export function editQuery(formData: FormData) {
  return `UPDATE products SET name = '${formData.get(
    "name"
  )}', weight = ${parseInt(
    formData.get("weight") as string
  )}, location = '${formData.get("location")}', quantity = ${parseInt(
    formData.get("quantity") as string
  )} WHERE article = '${formData.get("article")}'`;
}
