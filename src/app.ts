import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import v2 from "./routes/v2/index"





dotenv.config();

const app = express();

app.use(cors());


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


app.use("/api/v2",v2);

export default app;




