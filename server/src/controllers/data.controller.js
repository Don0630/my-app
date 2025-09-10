import { getData } from "../services/data.service.js";

export async function fetchData(req, res) {
  try {
    const data = await getData();
    res.json(data);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Server Error");
  }
}
