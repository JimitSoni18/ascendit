import { loginUser, signupUser } from "../../controllers/userController";

import express from "express";

// controller functions
const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

export default router;
