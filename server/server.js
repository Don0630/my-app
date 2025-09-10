import express from "express";
import cors from "cors";
import dataRoutes from "./routes/data.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/data", dataRoutes);

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
