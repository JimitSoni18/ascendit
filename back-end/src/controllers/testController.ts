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
		const tests = await Test.find(
			{},
			{ title: true, rating: true, creator: true }
		).sort({ createdAt: -1 }).populate("creator", {email: true});

		res.json(tests);
	} catch (error) {
		console.log("what is error?", error)
		res.json({ success: true, error });
	}
}

export async function getTestById(req: Request, res: Response) {
	try {
		const _id = new Types.ObjectId(req.params.id);
		res.json(await Test.findById(_id).populate("questions"));
	} catch (error) {
		res.json({ error });
	}
}

export async function createTest(req: Request, res: Response) {
	console.log("=>> calling createTest");
	let parsedToken: IParsedToken;
	try {
		parsedToken = validateAndGetId(req.cookies.token);
	} catch (error) {
		console.log("=>> error parsing token. returning");
		return res.status(401).json({ success: false, error: "Unauthorized" });
	}
	try {
		const testData: ICreateTestPayload = req.body;
		const user_id = new Types.ObjectId(parsedToken._id);
		const user = await User.findById(user_id);

		if (!user) {
			console.log("=>> unauthorized. returning");
			return res.status(401).json({ success: false, error: "Who are you?!" });
		}

		if (testData.questions.length < 5 || testData.questions.length > 200) {
			console.log("=>> questions too less/too many. returning");
			return res.status(400).json({
				success: false,
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

		res.json({ success: true });
	} catch (error) {
		res.status(500).json({ success: false, error });
	}
	console.log("=>> successful. returning");
}
