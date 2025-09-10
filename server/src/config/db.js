import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
  port: parseInt(process.env.DB_PORT)
};

const pool = new sql.ConnectionPool(dbConfig);
const poolConnect = pool.connect();

export { sql, poolConnect, pool };
