import express from "express";

import config from "../server/config";
import healthCtrl from "../controllers/health";

import authRoutes from "./auth";
import userRoutes from "./users";
import transferRoutes from "./transfer";

const router = express.Router();

router.get("/", healthCtrl.healthCheck);

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/transfer", transferRoutes);

export default router;
