import {
	listTests,
	createTest,
	getTestById,
} from "src/controllers/testController";
import { Router } from "express";

const router = Router();

router.get("/", listTests);

router.post("/", createTest);

router.get("/:id", getTestById);

export default router;
