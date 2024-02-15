// const mongoose = require("mongoose");
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
	email: string;
	password: string;
}

const userSchema = new Schema<IUser>({
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

userSchema.pre("save", async function () {
	console.log(this);
});

// // static signup method
// userSchema.statics.signup = async function (email, password) {
// 	const exists = await this.findOne({ email });

// 	if (exists) {
// 		throw Error("Email already in use");
// 	}

// 	const salt = await bcrypt.genSalt(10);
// 	const hash = await bcrypt.genSalt(10);
// };

export default model("User", userSchema);
