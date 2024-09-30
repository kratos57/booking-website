import express from "express";
import { Add } from "../controllers/payment.js";

const router = express.Router();


router.post("/pay", Add)


export default router;