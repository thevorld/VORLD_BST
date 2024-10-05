// src/api/routes/errorTestRoutes.ts
import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { errorTestController } from "../../controllers/Tests/errorTestController";

const router = Router();

router.get("/", errorTestController);

router.get(
  "/",
  [
    body("exampleField")
      .isString()
      .withMessage("exampleField must be a string"),
    // Add more validation rules as needed
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  errorTestController
);

export default router;
