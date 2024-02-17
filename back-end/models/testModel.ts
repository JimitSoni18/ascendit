import { Schema, model, Types } from "mongoose";

interface ITest {
	creator: Types.ObjectId;
	reviews: Types.ObjectId[];
	rating: number;
	questions: Types.ObjectId[];
	keywords: string[];
}

const testSchema = new Schema<ITest>({
	creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
	reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
	rating: { type: Number },
	questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
	keywords: [{ type: String }],
});

export default model<ITest>("Test", testSchema);
