const express = require('express');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const authRouter = require('./api/routes/authRoutes');
const mainRouter = require('./api/routes/mainRoutes');
const errorHandler = require('./api/middleware/errorHandler');
const cookieParser = require('cookie-parser');
require('dotenv').config();

async function bootstrap() {
	try {
		const app = express();
		await connectDB();
		app.use(express.json());

		app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
		app.use(cookieParser());
		app.use('/api', mainRouter);
		app.use('/api/auth', authRouter);

		app.use(errorHandler);

		app.listen(process.env.port, () => {
			console.log(`server is running on port ${process.env.port}`);
		});
	} catch (err) {
		console.log(err);
		console.log('failed');
	}
}

bootstrap();
