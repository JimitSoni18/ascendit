import express from "express";
import loginRoutes from "src/routes/auth/login";
import testRoutes from "src/routes/test/test";
import reviewRoutes from "src/routes/review/review";
import mongoose from "mongoose";
import assert from "assert";
import cookieParser from "cookie-parser";
import "dotenv/config";

// config
assert(
	process.env.MONGO_CONNECTION_URL !== undefined,
	"The mongo connection URL is not set in the environment. Please refer .env.sample for a sample config"
);
assert(
	process.env.PORT !== undefined,
	"The server port number is not specified in the environment. Please refer .env.sample for a sample config"
);
assert(
	process.env.JWT_SECRET !== undefined,
	"The JWT secret is not specified in the environment. Please refer .env.sample for a sample config"
);

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", loginRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/review", reviewRoutes);

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
