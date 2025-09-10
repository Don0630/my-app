import { poolConnect, pool } from "../config/db.js";

export async function getData() {
  await poolConnect; // wait for connection
  const result = await pool.request().query("SELECT TOP 20 * FROM YourTable");
  return result.recordset;
}
