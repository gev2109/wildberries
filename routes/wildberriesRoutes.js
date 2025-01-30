import express from "express";
import { uploadData } from "../controllers/wildberriesController.js";

const router = express.Router();

router.get("/upload", uploadData);

export default router;
