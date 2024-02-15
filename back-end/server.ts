const express = require("express");
import loginRoutes from "./routes/auth/login";

const app = express();

// routes
app.use("/api/auth", loginRoutes);

app.listen(4000, () => {
	console.log("listening on port 4000");
});

export {};
