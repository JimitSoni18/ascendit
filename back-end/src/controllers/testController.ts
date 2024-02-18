import { IQuestion } from "src/models/questionModel";
import { createQuestionsReturningIds } from "./questionController";
import Test from "src/models/testModel";
import User from "src/models/userModel";
import { Request, Response } from "express";
import { Types } from "mongoose";
import { IParsedToken, validateAndGetId } from "src/utils/token";

interface ICreateTestPayload {
	title: string;
	keywords: string[];
	questions: IQuestion[];
}

export async function listTests(_: Request, res: Response) {
	try {
		const tests = await Test.find().sort({ createdAt: -1 });

		res.json(tests);
	} catch (error) {
		res.json({ error });
	}
}

export async function getTestById(req: Request, res: Response) {
	try {
		const _id = req.params.id;
		res.json(await Test.findById(_id));
	} catch (error) {
		res.json({ error });
	}
}

export async function createTest(req: Request, res: Response) {
	let parsedToken: IParsedToken;
	try {
		parsedToken = validateAndGetId(req.cookies.token);
	} catch (error) {
		res.status(401).json({ error: "Unauthorized" });
		return;
	}
	try {
		const testData: ICreateTestPayload = req.body;
		const user = await User.findById({
			_id: new Types.ObjectId(parsedToken._id),
		});

		if (!user) {
			return res.status(401).json({ error: "Who are you?!" });
		}

		if (testData.questions.length < 5 || testData.questions.length > 200) {
			return res.status(400).json({
				error: "Number of questions should be within the of range 5 - 200",
			});
		}
		const questions = await createQuestionsReturningIds(testData.questions);
		await Test.create({
			creator: user._id,
			title: testData.title,
			reviews: [],
			rating: 0,
			keywords: testData.keywords,
			questions,
		});
	} catch (error) {
		res.status(500).json({ error });
	}
}
