import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "Healthy", message: "Server is running smoothly" });
});

export default router;
