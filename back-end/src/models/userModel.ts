// const mongoose = require("mongoose");
import { Model, Schema, Document, model } from "mongoose";
import bcrypt from "bcryptjs";
import { isEmail, isStrongPassword } from "validator";

interface IUser {
	email: string;
	password: string;
}

interface IUserMethods {}

interface IUserModel extends Model<IUser, {}, IUserMethods> {
	signup(
		email: string,
		password: string
	): Promise<Document<unknown, {}, IUser>>;

	login(email: string, password: string): Promise<Document<unknown, {}, IUser>>;
}

const userSchema = new Schema<IUser, IUserModel>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: { type: String, required: true },
	},
	{
		statics: {
			async signup(email: string, password: string) {
				{
					const exists = await this.findOne({ email });

					if (!email || !password) {
						throw Error("All fields must be filled");
					}

					if (!isEmail(email)) {
						throw Error("Email is not valid");
					}

					if (!isStrongPassword(password)) {
						throw Error("Password not strong enough");
					}

					if (exists) {
						throw Error("Email already in use");
					}

					const salt = await bcrypt.genSalt(10);
					password = await bcrypt.hash(password, salt);

					const user: Document<unknown, {}, IUser> = await this.create({
						email,
						password,
					});

					return user;
				}
			},

			async login(email, password) {
				if (!email && !password) {
					throw Error("All fields must be filled");
				}

				const user = await this.findOne({ email });

				if (!user) {
					throw Error("Incorrect email");
				}

				const match = await bcrypt.compare(password, user.password);

				if (!match) {
					throw Error("Incorrect password");
				}

				return user;
			},
		},
	}
);

export default model<IUser, IUserModel>("User", userSchema);
