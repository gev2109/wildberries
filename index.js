import express from "express";
import cors from "cors";
import wildberriesRoutes from "./routes/wildberriesRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", wildberriesRoutes);

app.listen(3000, () => console.log("http://localhost:5000"));
