import { Request, Response } from "express";
import User from "src/models/userModel";
import jwt from "jsonwebtoken";

function createToken(_id: unknown) {
	return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
}

// login
async function loginUser(req: Request, res: Response) {
	const { email, password } = req.body;

	try {
		const user = await User.login(email, password);

		// create token
		const token = createToken(user._id);

		res.cookie("token", token, {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
		res.status(200).json({ email });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

// signup
async function signupUser(req: Request, res: Response) {
	const { email, password } = req.body;

	try {
		const user = await User.signup(email, password);

		// create a token
		const token = createToken(user._id);

		res.cookie("token", token, {
			httpOnly: true,
			sameSite: "none",
			secure: true,
		});
		res.status(200).json({ email });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

export { loginUser, signupUser };
