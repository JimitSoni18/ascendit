import { Schema, Types, model } from "mongoose";

interface IReview {
	author: Types.ObjectId;
	rating: number;
	comment: string;
	test: Types.ObjectId;
}

const reviewSchema = new Schema<IReview>({
	rating: { type: Number, required: true },
	comment: { type: String, required: true },
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
		unique: true,
	},
	test: { type: Schema.Types.ObjectId, ref: "Test", required: true },
});

export default model<IReview>("Review", reviewSchema);
