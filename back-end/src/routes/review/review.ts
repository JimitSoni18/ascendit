import { Router } from "express";
import { createReview } from "src/controllers/reviewController";

const router = Router();

// router.get("/", (req, res) => {})

router.post("/", createReview);

export default router;
