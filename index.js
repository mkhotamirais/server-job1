import express from "express";
import "dotenv/config";
import customerRoutes from "./routes/customerRoutes.js";
import { run } from "./config/index.js";
import cors from "cors";

run();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("welcome to server-job1");
});

app.use("/api", customerRoutes);

app.listen(port, () => console.log(`server running on http://localhost:${port}`));
