import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "news_site",
  waitForConnections: true,
  connectionLimit: 10,
});
