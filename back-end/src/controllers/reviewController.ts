import { Request, Response } from "express";
import { Types } from "mongoose";
import Review from "src/models/reviewModel";
import Test from "src/models/testModel";
import User from "src/models/userModel";
import { IParsedToken, validateAndGetId } from "src/utils/token";

interface IReview {
	author: string;
	test: string;
	rating: number;
	comment: string;
}

export async function createReview(req: Request, res: Response) {
	let parsedToken: IParsedToken;
	try {
		parsedToken = validateAndGetId(req.cookies.token);
	} catch (error) {
		return res.status(401).json({ error: "Unauthorized" });
	}
	try {
		const review: IReview = req.body;

		const author = new Types.ObjectId(review.author);
		const returnedAuthor = await User.findById(author);

		if (!returnedAuthor) {
			return res.status(400).json({ error: "Author not found" });
		}

		const test = new Types.ObjectId(review.test);
		const returnedTest = await Test.findById(test);

		if (!returnedTest) {
			return res.status(400).json({ error: "Test not found" });
		}

		if (review.comment.length < 10) {
			return res.status(400).json({ error: "Comment is too short" });
		}

		if (review.rating < 1 || review.rating > 10) {
			return res.status(400).json({ error: "Rating is invalid" });
		}

		const createdReview = await Review.create({
			author,
			test,
			rating: review.rating,
			comment: review.comment,
		});

		res.status(200).json({ review: createdReview });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
}
