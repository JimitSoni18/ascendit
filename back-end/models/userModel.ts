// const mongoose = require("mongoose");
import { Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
	email: string;
	password: string;
}

interface IUserMethods {}

interface UserModel extends Model<IUser, {}, IUserMethods> {
	signup(): void;
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// userSchema.pre("save", async function () {
// 	console.log(this);
// });

// static signup method
userSchema.static("signup", async function(email, password) {
	const exists = await this.findOne({ email });

	if (exists) {
		throw Error("Email already in use");
	}

	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);
})

export default model("User", userSchema);
