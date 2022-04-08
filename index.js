const express = require("express");
const connectDB = require("./config/connectDB");
const authRouter = require("./routes/authRoutes");
const generalRouter = require("./routes/generalRoutes");
const errorHandler = require("./middlewere/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

async function bootstrap() {
	try {
		await connectDB();
		app.use(express.json());

		app.use(cors());
		app.use(cookieParser());
		// app.use("/", generalRouter);
		app.use("/api/auth", authRouter);

		app.use(errorHandler);

		app.listen(process.env.port, () => {
			console.log(`server is running on port ${process.env.port}`);
		});
	} catch (err) {
		console.log(err);
		console.log("failed");
	}
}

bootstrap();
