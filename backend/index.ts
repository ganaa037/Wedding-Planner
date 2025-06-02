import express, { json } from "express";
import { connectMongoDB } from "./connectDb.js";
import cors from "cors";
import { config, configDotenv } from "dotenv";
import { userRouter } from "./router/user.js";
configDotenv();

const port = process.env.PORT;
const app = express();

connectMongoDB();

app.use(cors());
app.use(json());

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
