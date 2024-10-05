import { Router, Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { createUser, getUserById } from "../services/userService";

const router = Router();

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

router.post(
  "/create",
  [
    body("username").isString().withMessage("Username must be a string"),
    body("email").isEmail().withMessage("Email must be valid"),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, email } = req.body;
      const user = createUser(username, email);
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      next(error); // Pass error to customErrorHandler
    }
  }
);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 */

router.get("/:id", (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = getUserById(userId);
  res.status(200).json({ message: `User with ID ${userId} retrieved`, user });
});

export default router;
