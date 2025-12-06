import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import { protectRoute } from './middleware/protectRoute.js';

import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';

dotenv.config();

const app = express();
const PORT = ENV_VARS.PORT || 5000;

app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectRoute, movieRoutes);

app.listen(PORT, () => {
  console.log('Server started at http://localhost:' + PORT);
  connectDB();
});
