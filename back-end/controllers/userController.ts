import {Request, Response} from "express";
import User from "../models/userModel";

// login
async function loginUser(req: Request, res: Response) {
	res.json({ error: "route not set" });
}

// signup
async function signupUser(req: Request, res: Response) {
	res.json({ error: "route not set" });
}

export { loginUser, signupUser };
