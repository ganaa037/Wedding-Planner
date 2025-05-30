import express, { json } from "express";
import { connectMongoDB } from "./connectDb.js";
import cors from "cors";
import { config, configDotenv } from "dotenv";
configDotenv();

const port = process.env.PORT;
const app = express();

connectMongoDB();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
