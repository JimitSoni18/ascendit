import { Schema, model, Types } from "mongoose";

interface ITest {
	creator: Types.ObjectId;
	title: string;
	reviews: Types.ObjectId[];
	rating: number;
	questions: Types.ObjectId[];
	keywords: string[];
}

const testSchema = new Schema<ITest>(
	{
		creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
		title: { type: String, required: true },
		reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
		rating: { type: Number, default: 0 },
		questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
		keywords: [{ type: String }],
	},
	{
		timestamps: true,
	}
);

export default model<ITest>("Test", testSchema);
