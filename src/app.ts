import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import v2 from "./routes/v2/index"
import path from "path";




dotenv.config();

const app = express();

app.use(cors());


// uploaded image will show for this line

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// this line will allow u to upload image in your server


app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));


app.use("/api/v2",v2);

export default app;




