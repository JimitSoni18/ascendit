import { Schema, model } from "mongoose";

interface IQuestion {
	text: string;
	answerOptions: string[];
	correctAnswer: string;
}

const questionSchema = new Schema<IQuestion>({
	text: { type: String, required: true },
	answerOptions: { type: [String], required: true },
	correctAnswer: { type: String, required: true },
});

export default model<IQuestion>("Question", questionSchema);
