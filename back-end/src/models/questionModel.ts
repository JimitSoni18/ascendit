import { Schema, model } from "mongoose";

export interface IQuestion {
	text: string;
	answerOptions: string[];
	correctAnswer: number;
	explanation: string;
}

const questionSchema = new Schema<IQuestion>({
	text: { type: String, required: true },
	answerOptions: { type: [String], required: true },
	correctAnswer: { type: Number, required: true },
	explanation: { type: String, required: true },
});

export default model<IQuestion>("Question", questionSchema);
