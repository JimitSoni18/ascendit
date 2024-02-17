import express from "express";
import loginRoutes from "./routes/auth/login";
import mongoose from "mongoose";
import assert from "assert";
import "dotenv/config";

// config
assert(
	process.env.MONGO_CONNECTION_URL !== undefined,
	"The mongo connection URL is not set in the environment. Please refer .env.sample for a sample config",
);
assert(
	process.env.PORT !== undefined,
	"The server port number is not specified in the environment. Please refer .env.sample for a sample config",
);
assert(
	process.env.JWT_SECRET !== undefined,
	"The JWT secret is not specified in the environment. Please refer .env.sample for a sample config",
);

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/auth", loginRoutes);

initiateConnection()
	.then(() => {
		app.listen(process.env.PORT, () => {
			console.log("listening on port ", 4000);
		});
	})
	.catch((err) => {
		console.log({ err });
	});

async function initiateConnection() {
	const connection = await mongoose.connect(process.env.MONGO_CONNECTION_URL);
}

export {};
