/* eslint-disable import/first */
require('newrelic');

import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Pusher from 'pusher';
import path from 'path';
import logger from './logger/config';
import healthRouter from './api/routes/health';
import databaseConnect from './database/database';
import channelRouter from './api/routes/channel';
import pusherRouter from './api/routes/pusher';

const app = express();

// CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, '/public')));

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// PORT and HOST initialization
const PORT: number = Number(process.env.PORT);
const HOST: string = String(process.env.HOST);

// Connect to database
databaseConnect();

// Morgan configuration
app.use(
	morgan((tokens, req: Request, res: Response) => {
		logger.info(
			`Method: ${tokens.method(req, res)} URL: ${tokens.url(req, res)} Status: ${tokens.status(req, res)} Resp Time: ${tokens['response-time'](
				req,
				res
			)} ms`
		);
		return null;
	})
);

// Import routers
app.use(healthRouter);
app.use('/channel', channelRouter);
app.use('/pusher', pusherRouter);

// Default route

app.listen(PORT, HOST, () => {
	logger.info(`Graphle server listening on http://${HOST}:${PORT}`);
});
