// src/api/routes/errorTestRoutes.ts
import { Router } from "express";
import { errorTestController } from "../../controllers/Tests/errorTestController";

const router = Router();

router.get("/", errorTestController);

export default router;
