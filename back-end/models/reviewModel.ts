import { Schema, Types, model } from "mongoose";

interface IReview {
	author: Types.ObjectId;
	rating: number;
	comment: string;
}

const reviewSchema = new Schema<IReview>({
	rating: { type: Number, required: true },
	comment: { type: String, required: true },
	author: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model<IReview>("Review", reviewSchema);
